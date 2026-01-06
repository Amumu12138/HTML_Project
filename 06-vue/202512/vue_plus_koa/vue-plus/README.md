###
2026-01-05

1、导入interface、type类型数据
``` A.type.ts文件导出
export interface IUser {}
export type TUser {}
```

```B.ts文件导入
import type { IUser, TUser } from 'A.type.ts'
```

2、开发环境修改为env.dev配置

vite构建环境默认为env.development,需要在package.json中修改scripts{ "dev": "vite --mode dev"}
###