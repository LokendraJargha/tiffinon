import {
  AUTHENTICATE,
  INIT_GRID,
  SET_SELECTED_GRID_IDS,
  SETGRIDDATA,
  USER,
  ROLES,
  MENU_TOGGLE,
  MODULES,
  PUBLISHERS,
  FEEDS,
} from "../constant";

export function setAuthenticate(payload) {
  return { type: AUTHENTICATE, payload };
}

export function setInitGrid(payload) {
  return { type: INIT_GRID, payload };
}

export function setSelectedGridIds(payload) {
  return { type: SET_SELECTED_GRID_IDS, payload };
}

export function setGridData(payload) {
  return { type: SETGRIDDATA, payload };
}

export function setUser(payload) {
  return { type: USER, payload };
}

export function setRoles(payload) {
  return { type: ROLES, payload };
}

export function setModules(payload) {
  return { type: MODULES, payload };
}

export function setMenuToggle(payload) {
  return { type: MENU_TOGGLE, payload };
}

export function setPublishers(payload) {
  return { type: PUBLISHERS, payload };
}

export function setFeeds(payload) {
  return { type: FEEDS, payload };
}
