# 贡献指南

## 欢迎贡献

AutoScan 项目欢迎各种形式的贡献，包括但不限于：

- 提交代码和功能增强
- 报告 bug 和问题
- 提出新功能建议
- 改进文档
- 参与讨论和社区支持

## 提交问题

如果您发现了 bug 或有功能建议，请在 GitHub 上提交 issue：

### 提交 Bug 报告

1. **明确描述问题场景** - 详细说明问题发生的环境和条件
2. **提供复现步骤** - 列出能够复现问题的具体步骤
3. **附加相关配置和日志** - 提供相关的配置文件和错误日志
4. **说明期望行为** - 描述您期望的正确行为
5. **添加标签** - 为 issue 添加适当的标签（如 bug、enhancement 等）

### 提交功能请求

1. **明确描述功能** - 详细说明您希望添加的功能
2. **说明使用场景** - 解释该功能的使用场景和价值
3. **提供实现建议** - 如果您有实现思路，可以提供建议
4. **添加标签** - 为 issue 添加适当的标签（如 enhancement、feature 等）

## 提交代码

如果您希望为 AutoScan 项目贡献代码，请按照以下步骤操作：

### 1. Fork 仓库

在 GitHub 上 fork AutoScan 仓库到您自己的账户：

1. 访问 [https://github.com/itrys/autoscan-spring-boot-starter](https://github.com/itrys/autoscan-spring-boot-starter)
2. 点击 "Fork" 按钮

### 2. 克隆仓库

将您 fork 的仓库克隆到本地：

```bash
git clone https://github.com/YOUR_USERNAME/autoscan-spring-boot-starter.git
cd autoscan-spring-boot-starter
```

### 3. 创建分支

创建一个新的功能分支：

```bash
git checkout -b feature/AmazingFeature
```

### 4. 进行修改

在本地进行代码修改，确保：

- 遵循项目的代码风格和规范
- 编写清晰的代码注释
- 添加必要的单元测试
- 确保代码能够通过所有测试

### 5. 提交更改

提交您的更改：

```bash
git commit -m 'Add some AmazingFeature'
```

### 6. 推送分支

将您的分支推送到 GitHub：

```bash
git push origin feature/AmazingFeature
```

### 7. 创建 Pull Request

在 GitHub 上创建 Pull Request：

1. 访问您 fork 的仓库
2. 点击 "Pull requests" 选项卡
3. 点击 "New pull request" 按钮
4. 选择您的功能分支和目标分支
5. 填写 PR 描述，包括：
   - 更改的内容
   - 解决的问题
   - 测试情况
   - 其他相关信息
6. 点击 "Create pull request" 按钮

## 代码规范

### Java 代码规范

- 遵循 Java 代码规范（如 Google Java Style Guide）
- 使用 4 个空格进行缩进
- 行长度不超过 120 个字符
- 方法和变量命名使用驼峰命名法
- 类名使用大写开头的驼峰命名法
- 常量使用全大写字母，单词之间用下划线分隔
- 提供清晰的代码注释

### 提交消息规范

提交消息应遵循以下格式：

```
<类型>: <描述>

<详细说明>

<关联的 issue 编号>
```

**类型** 可以是：
- `feat` - 新功能
- `fix` - 修复 bug
- `docs` - 文档更改
- `style` - 代码风格更改
- `refactor` - 代码重构
- `test` - 测试相关更改
- `chore` - 构建或依赖更改

**示例**：

```
feat: Add support for package path wildcards

This change adds support for package path wildcards in base-packages configuration,
allowing users to specify patterns like "org.itrys.*" to scan multiple subpackages.

Closes #123
```

## 开发环境设置

### 前提条件

- JDK 17 或更高版本
- Maven 3.6 或更高版本
- Git

### 构建项目

```bash
mvn clean install
```

### 运行测试

```bash
mvn test
```

### 代码质量检查

```bash
mvn checkstyle:check
```

## 行为准则

参与 AutoScan 项目的所有贡献者都应遵循以下行为准则：

- **尊重他人** - 尊重其他贡献者，避免使用冒犯性语言或行为
- **建设性反馈** - 提供建设性的反馈和建议
- **包容多样性** - 欢迎不同背景和经验的贡献者
- **专注于问题** - 讨论应专注于项目相关的问题，避免个人攻击或无关话题
- **遵守开源协议** - 遵守项目的开源协议（Apache License 2.0）

## 联系方式

如果您有任何问题或需要帮助，可以通过以下方式联系我们：

- **GitHub**：[https://github.com/itrys/autoscan-spring-boot-starter](https://github.com/itrys/autoscan-spring-boot-starter)
- **Gitee**：[https://gitee.com/itrys/autoscan-spring-boot-starter](https://gitee.com/itrys/autoscan-spring-boot-starter)
- **Email**：contact@itrys.org

## 致谢

感谢所有为 AutoScan 项目做出贡献的开发者和用户！您的支持和贡献是项目不断发展的动力。