const env = import.meta.env.MODE || "prod";
const EnvConfig = {
    development: {
        baseApi: "/api",
        mockApi: "/api",
    },
    test: {
        baseApi: "/api",
        mockApi: "/api",
    },
    prod: {
        baseApi: "/api",
        mockApi: "/api",
    },
};

export default {
    env,
    ...EnvConfig[env],
    // mock
    mock: false,
};