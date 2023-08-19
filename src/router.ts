import { isArray } from "lodash-es";
import { el } from "./element";

interface Props {
  link: string;
  name: string;
}

export const RouterLink = (props: Props) => {
  const active = props.link === window.location.pathname;

  return el({
    $tag: 'a',
    $attrs: {
      href: `${props.link}`,
      class: `${active ? ['active'] : ''}`,
      ['data-link']: '',
    },
    $children: [props.name],
  });
};


export const RouterView  = (props: HTML)=>{
  
    return el({
        $tag: props ?? 'div',
        $attrs:{
            class:'router-view'
        }
    })
}
let routerView: any = null;

export const createRouter = ({ routes}: {routes: any})=>{

  const navigateTo = (url: any) => {
    history.pushState(null, "/", url);
    router();
  };

  window.addEventListener("load", () => {
    document.body.addEventListener("click", (e: MouseEvent) => {
      const target = e.target;
  
      if (
        target instanceof HTMLAnchorElement &&
        target.hasAttribute("data-link")
      ) {
        e.preventDefault();
        navigateTo(target.href);
      }
    });
    router();
  });

  let componentMaker: any = async (component: any) => {
    const result = await component();
    
    if (isArray(result)) {
      return Promise.all(result);
    } else {
      return result;
    }
  };
  
  
  const router = async () => {


    const potentialMatches = routes.map((route: { path: string; }) => {
      return {
        route: route,
        isMatch: location.pathname === route.path,
      };
    });
  
    let match: any = potentialMatches.find(
      (potentialMatch: { isMatch: any; }) => potentialMatch.isMatch
    );
    if (!match) {
      match = {
        isMatch: true,
        route: routes[routes.length - 1],
      };
    }

    const component = await componentMaker(match.route.component);

    routerView = document.querySelector(".router-view");
  
    while (routerView?.firstChild) {
      routerView.removeChild(routerView.firstChild);
    }
  
    if (isArray(component)) {
      for (const comp of component) {
        if (comp instanceof Node) {  
          routerView?.appendChild(comp);
        }
      }
    } else if (component instanceof Node) {  
      routerView?.appendChild(component);
    }
  };
}
export { routerView };
