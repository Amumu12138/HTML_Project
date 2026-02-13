export default [
    {
        path: "/home",
        name: "home",
        label: "首页",
        icon: "house",
        url: "Home",
    },
    {
        path: "/mall",
        name: "mall",
        label: "商品管理",
        icon: "video-play",
        url: "Mall",
    },
    {
        path: "/user",
        name: "user",
        label: "用户管理",
        icon: "user",
        url: "User",
    },
    {
        path: "other",
        label: "其他",
        icon: "location",
        children: [
            {
                path: "/page1",
                name: "page1",
                label: "页面1",
                icon: "setting",
                url: "Page1",
            },
            {
                path: "/page2",
                name: "page2",
                label: "页面2",
                icon: "setting",
                url: "Page2",
            },
        ],
    },
];