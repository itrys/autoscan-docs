# AutoScan <small>1.2.0</small>

> 轻量级 Spring Boot Starter，解决跨包扫描痛点

- 🚀 自动扫描基础包，配置一次，全局生效
- 🎯 业务包零配置，利用 @SpringBootApplication 默认扫描机制
- 🏗️ 多层基础设施支持，业务项目也可作为其他项目的基础设施
- 🔧 非侵入式设计，不改变现有代码结构
- 📊 开发者友好，提供详细的扫描日志便于调试
- ⚡ 轻量级，无额外依赖，与 Spring Boot 3.x/4.x 完美兼容

**v1.2.0 新特性**

- 📦 @Import 兼容性 - 支持在配置中直接导入特定类
- ⚡ 懒加载初始化 - 支持 Bean 的懒加载创建，优化性能
- 🔧 启用开关 - 支持完全启用或禁用 AutoScan 组件

**v1.1.0 新特性**

- 🌟 通配符包支持 - 使用 `*` 和 `**` 简化配置
- 🚫 排除扫描 - 精确控制扫描范围
- 🎨 自定义注解 - 扩展扫描能力

[GitHub](https://github.com/itrys/autoscan-spring-boot-starter)
[Gitee](https://gitee.com/itrys/autoscan-spring-boot-starter)
[开始使用](#autoscan)
