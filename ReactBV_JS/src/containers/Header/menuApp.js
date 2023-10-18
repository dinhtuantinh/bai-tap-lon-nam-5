export const adminMenu = [
  {
    //quản lý người dùng
    name: "menu.admin.manage-user",
    menus: [
      // {
      //   name: "menu.admin.crud",
      //   link: "/system/user-manage",
      // },
      {
        //thay đổi thông tin cá nhân
        name: "menu.doctor.doctor-edit-info",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      // {
      //   name: "menu.admin.manage-doctor",
      //   link: "/system/manage-doctor",
      //   // subMenus: [
      //   //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
      //   //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
      //   // ]
      // },
      // {
      //     name: 'menu.admin.manage-admin',
      //     link: '/system/user-admin',
      // },
      // {
      //   //quản lý ke hoach kham benh doctor
      //   name: "menu.doctor.manage-schedule",
      //   link: "/doctor/manage-schedule",
      // },
    ],
  },
  {
    //quản lý chuyên khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
  {
    //quản lý cẩm nang
    name: "menu.admin.note",
    menus: [
      {
        name: "menu.admin.manage-note",
        link: "/system/manage-note",
      },
    ],
  },
  {
    //quản lý thiết bị y tế
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
      // {
      //   name: "menu.admin.list-clinic",
      //   link: "/system/list-clinic",
      // },
    ],
  },
];
export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        //quản lý ke hoach kham benh cua doctor

        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      {
        //quản lý ke benh nhan cua doctor

        name: "menu.doctor.manage-patient",
        link: "/doctor/manage-patient",
      },
      {
        //thay đôi thông tin cua doctor

        name: "menu.doctor.doctor-edit-info",
        link: "/doctor/doctor-edit-info",
      },
    ],
  },
];
