import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {
  // Sidenav responsive
  width;
  height;
  mode: string = 'side';
  open = 'true';
  title = 'Portal';
  navList: NavList[];
  navAccount: NavAccount[];
  constructor(
    public ngZone: NgZone,
    public route: Router,
    public authService: AuthService
  ) {
    this.navList = [
      // {
      //   text: 'Hệ thống',
      //   icon: 'donut_small',
      //   link: '',
      //   query: '',
      //   visable: true,
      //   dropDown: false,
      //   childrens: [
      //     {
      //       text: 'Modules',
      //       icon: 'view_module',
      //       link: '/modules',
      //       query: '',
      //       visable: true,
      //       dropDown: true,
      //       childrens: null
      //     },
      //     {
      //       text: 'Nhóm quyền',
      //       icon: 'work',
      //       link: '/roles',
      //       query: '',
      //       visable: true,
      //       dropDown: true,
      //       childrens: null
      //     }
      //   ]
      // },
      // {
      //   text: 'Người dùng',
      //   icon: 'streetview',
      //   link: '',
      //   query: '',
      //   visable: true,
      //   dropDown: false,
      //   childrens: [
      //     {
      //       text: 'Tài khoản',
      //       icon: 'person',
      //       link: '/users',
      //       query: '',
      //       visable: true,
      //       dropDown: true,
      //       childrens: null
      //     },
      //     {
      //       text: 'Phân quyền',
      //       icon: 'vpn_key',
      //       link: '/user-roles',
      //       query: '',
      //       visable: true,
      //       dropDown: true,
      //       childrens: null
      //     }
      //   ]
      // },
      {
        text: 'Doanh nghiệp',
        icon: 'perm_contact_calendar',
        link: '',
        query: '',
        visable: true,
        dropDown: false,
        childrens: [
          {
            text: 'Hợp đồng',
            icon: 'class',
            link: '/contract-enterprise',
            query: '',
            visable: true,
            dropDown: true,
            childrens: null
          },
          {
            text: 'Dịch vụ',
            icon: 'description',
            link: '/services',
            query: '',
            visable: true,
            dropDown: true,
            childrens: null
          }
        ]
      }
      // {
      //   categoryName: 'Tab 2',
      //   icon: 'question_answer',
      //   dropDown: false,
      //   subCategory: [
      //     {
      //       subCategoryName: 'Item 1',
      //       subCategoryLink: '/link1',
      //       visable: true
      //     },
      //     {
      //       subCategoryName: 'Item 2',
      //       subCategoryLink: '/link1',
      //       visable: true
      //     },
      //     {
      //       subCategoryName: 'Item 3',
      //       subCategoryLink: '/link1',
      //       visable: true
      //     }
      //   ]
      // },
      // {
      //   categoryName: 'Tab 3',
      //   icon: 'work',
      //   dropDown: false,
      //   subCategory: [
      //     {
      //       subCategoryName: 'Item 1',
      //       subCategoryLink: '/link1',
      //       visable: true
      //     },
      //     {
      //       subCategoryName: 'Item 2',
      //       subCategoryLink: '/link1',
      //       visable: true
      //     }
      //   ]
      // }
    ];
    this.navAccount = [
      { name: 'Profile', icon: 'account_box', url: '/profile' },
      { name: 'Settings', icon: 'settings', url: '/settings' },
      { name: 'Logout', icon: 'reply', url: '/logout' }
    ];
    this.changeMode();
    window.onresize = e => {
      ngZone.run(() => {
        this.changeMode();
      });
    };
  }
  ngOnInit() {}
  Logout() {
    this.authService.Logout();
  }
  changeMode() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    if (this.width <= 800) {
      this.mode = 'over';
      this.open = 'false';
    }
    if (this.width > 800) {
      this.mode = 'side';
      this.open = 'true';
    }
  }
}
export class NavList {
  text: string;
  icon: string;
  link: string;
  query: string;
  visable: boolean;
  dropDown: boolean;
  childrens: NavList[];
  constructor(
    _text: string,
    _icon: string,
    _link: string,
    _query: string,
    _visable: boolean,
    _dropDown: boolean,
    _childrens: NavList[]
  ) {
    this.text = _text;
    this.icon = _icon;
    this.link = _link;
    this.query = _query;
    this.visable = _visable;
    this.dropDown = _dropDown;
    this.childrens = _childrens;
  }
}
export class NavListChild extends NavList {
  options: string;
}
export class NavAccount {
  name: string;
  icon: string;
  url: string;
}
