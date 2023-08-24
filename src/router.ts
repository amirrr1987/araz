import { isArray, isNull } from "lodash-es";
import { HTMLTags } from "./types";
import { el } from "./element";
import { render } from "./render";

interface Props {
  link: string;
  name: string;
}

export const RouterLink = (props: Props) => {
  const active = props.link === window.location.pathname;

  return el({
    $tag: "a",
    $attrs: {
      href: `${props.link}`,
      class: `${active ? ["active"] : ""}`,
      ["data-link"]: "",
    },
    $children: [props.name],
  });
};

export const RouterView = (props: HTMLTags) => {
  return el({
    $tag: props ?? "div",
    $attrs: {
      class: "router-view",
    },
  });
};
let routerView: any = null;

export const createRouter = ({ routes }: { routes: any }) => {
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
    const result = await component;

    if (isArray(result)) {
      return Promise.all(result);
    } else {
      return result;
    }
  };

  const router = async () => {
    const potentialMatches = routes.map((route: { path: string }) => {
      return {
        route: route,
        isMatch: location.pathname === route.path,
      };
    });

    let match: any = potentialMatches.find(
      (potentialMatch: { isMatch: any }) => potentialMatch.isMatch
    );
    if (!match) {
      match = {
        isMatch: true,
        route: routes[routes.length - 1],
      };
    }
    console.log(match.route.component);
    
    const node = await componentMaker(match.route.component());
    console.log(node);
    
    const component = await render(node)
    console.log(component);
    
    routerView = document.querySelector(".router-view");
    console.log(routerView);
    
    if (!isNull(routerView)) {
      routerView.innerHTML = "";
      routerView.appendChild(component);
    }
  };
};
export { routerView };
