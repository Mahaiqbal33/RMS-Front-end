import { makeObservable, observable, action } from 'mobx';

class SidebarStore {
  sidebarOpen = false;
  openMenus = [];
   
  constructor() {
    makeObservable(this, {
      sidebarOpen: observable,
      openMenus: observable,
      setSidebarOpen: action,
      setOpenMenus: action,
      toggleMenu: action,
      handleMouseEnter: action,
      handleMouseLeave: action,
    });
  }

  setSidebarOpen(isOpen) {
    this.sidebarOpen = isOpen;
  }

  setOpenMenus(menus) {
    this.openMenus = menus;
  }

  toggleMenu(index) {
    if (this.openMenus.includes(index)) {
      this.openMenus = this.openMenus.filter((item) => item !== index);
    } else {
      this.openMenus = [...this.openMenus, index];
    }
  }
  
  handleMouseEnter(index){
    this.openMenus= [...sidebarStore.openMenus, index]
  }

  handleMouseLeave(){
    this.openMenus = [];
  }

  
}

export const sidebarStore = new SidebarStore();
