import { isArray, isNull } from "lodash-es";
import { HTMLTags, Route, VNode } from "./types";
import { el } from "./element";
import { render } from "./render";

interface Props {
  link: string;
  name: string;
}

/**
 * Creates a clickable link for router navigation, with active state management.
 * 

 * 
 * @param link - The target route link for navigation.
 * @param name - The display text of the link.
 * @returns The virtual DOM element (VNode) representing the router link.
 * 
 * @example
 *```
 * const linkProps = {
 *   link: '/home',
 *   name: 'Home',
 * };
 * const routerLink = RouterLink(linkProps);
 * // Render the router link in your component's template.
 *```
 */
export const RouterLink = ({ name, link }: Props): VNode => {
  const active = link === window.location.pathname;

  return el({
    $tag: "a",
    $attrs: {
      href: `${link}`,
      class: `${active ? ["active"] : ""}`,
      ["data-link"]: "",
    },
    $children: [name],
  });
};

/**
 * Renders a router view element for displaying the content of the active route.
 *
 * @param  $tag - The HTML tag name for rendering the router view. Defaults to "div" if not provided.
 * @returns  The virtual DOM element (VNode) representing the router view.
 *
 *
 * @example
 * ```
 * // Render the router view in your component's template.
 * const routerView = RouterView("section");
 * // or
 * const defaultRouterView = RouterView();
 * // ...
 * ```
 */
export const RouterView = ($tag: HTMLTags): VNode => {
  return el({
    $tag: $tag ?? "div",
    $attrs: {
      class: "router-view",
    },
  });
};
let routerView: any = null;

/**
 * Creates a basic router implementation for handling navigation and rendering components based on routes.
 *
 * @param routes - An array of route configurations.
 *
 * @example
 * ```
 * // Define route configurations
 * const routes = [
 *   { path: '/', component: Home },
 *   { path: '/about', component: About },
 *   // ...
 * ];
 * // Create the router instance
 * const router = createRouter({ routes });
 * // ...
 * ```
 */
export const createRouter = ({ routes }: { routes: Route[] }) => {
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

    const node = await componentMaker(match.route.component());

    const component = await render(node);

    routerView = document.querySelector(".router-view");

    if (!isNull(routerView)) {
      routerView.innerHTML = "";
      routerView.appendChild(component);
    }
  };
};
export { routerView };
