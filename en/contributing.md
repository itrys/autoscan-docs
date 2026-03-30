# Contributing

## Welcome Contributions

The AutoScan project welcomes various forms of contributions, including but not limited to:

- Submitting code and feature enhancements
- Reporting bugs and issues
- Proposing new feature suggestions
- Improving documentation
- Participating in discussions and community support

## Submitting Issues

If you find a bug or have a feature suggestion, please submit an issue on GitHub:

### Submitting Bug Reports

1. **Clearly Describe the Problem Scenario** - Detailed explanation of the environment and conditions where the problem occurs
2. **Provide Reproduction Steps** - List specific steps that can reproduce the problem
3. **Attach Relevant Configuration and Logs** - Provide relevant configuration files and error logs
4. **Describe Expected Behavior** - Describe the correct behavior you expect
5. **Add Labels** - Add appropriate labels to the issue (like bug, enhancement, etc.)

### Submitting Feature Requests

1. **Clearly Describe the Feature** - Detailed explanation of the feature you want to add
2. **Explain Use Cases** - Explain the use cases and value of the feature
3. **Provide Implementation Suggestions** - If you have implementation ideas, you can provide suggestions
4. **Add Labels** - Add appropriate labels to the issue (like enhancement, feature, etc.)

## Submitting Code

If you wish to contribute code to the AutoScan project, please follow these steps:

### 1. Fork the Repository

Fork the AutoScan repository to your own account on GitHub:

1. Visit [https://github.com/itrys/autoscan-spring-boot-starter](https://github.com/itrys/autoscan-spring-boot-starter)
2. Click the "Fork" button

### 2. Clone the Repository

Clone your forked repository locally:

```bash
git clone https://github.com/YOUR_USERNAME/autoscan-spring-boot-starter.git
cd autoscan-spring-boot-starter
```

### 3. Create a Branch

Create a new feature branch:

```bash
git checkout -b feature/AmazingFeature
```

### 4. Make Changes

Make code changes locally, ensuring:

- Follow the project's code style and conventions
- Write clear code comments
- Add necessary unit tests
- Ensure code passes all tests

### 5. Commit Changes

Commit your changes:

```bash
git commit -m 'Add some AmazingFeature'
```

### 6. Push Branch

Push your branch to GitHub:

```bash
git push origin feature/AmazingFeature
```

### 7. Create Pull Request

Create a Pull Request on GitHub:

1. Visit your forked repository
2. Click the "Pull requests" tab
3. Click the "New pull request" button
4. Select your feature branch and target branch
5. Fill in the PR description, including:
   - What was changed
   - What problem was solved
   - Testing status
   - Other relevant information
6. Click the "Create pull request" button

## Code Conventions

### Java Code Conventions

- Follow Java code conventions (like Google Java Style Guide)
- Use 4 spaces for indentation
- Line length should not exceed 120 characters
- Use camelCase for method and variable naming
- Use PascalCase for class naming
- Use ALL_CAPS with underscores for constants
- Provide clear code comments

### Commit Message Conventions

Commit messages should follow this format:

```
<type>: <description>

<detailed explanation>

<related issue number>
```

**Type** can be:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes
- `refactor` - Code refactoring
- `test` - Test-related changes
- `chore` - Build or dependency changes

**Example**:

```
feat: Add support for package path wildcards

This change adds support for package path wildcards in base-packages configuration,
allowing users to specify patterns like "org.itrys.*" to scan multiple subpackages.

Closes #123
```

## Development Environment Setup

### Prerequisites

- JDK 17 or higher
- Maven 3.6 or higher
- Git

### Build Project

```bash
mvn clean install
```

### Run Tests

```bash
mvn test
```

### Code Quality Check

```bash
mvn checkstyle:check
```

## Code of Conduct

All contributors participating in the AutoScan project should follow this code of conduct:

- **Respect Others** - Respect other contributors, avoid using offensive language or behavior
- **Constructive Feedback** - Provide constructive feedback and suggestions
- **Embrace Diversity** - Welcome contributors from different backgrounds and experiences
- **Focus on Issues** - Discussions should focus on project-related issues, avoid personal attacks or unrelated topics
- **Follow Open Source License** - Comply with the project's open source license (Apache License 2.0)

## Contact

If you have any questions or need help, you can contact us through:

- **GitHub**: [https://github.com/itrys/autoscan-spring-boot-starter](https://github.com/itrys/autoscan-spring-boot-starter)
- **Gitee**: [https://gitee.com/itrys/autoscan-spring-boot-starter](https://gitee.com/itrys/autoscan-spring-boot-starter)
- **Email**: contact@itrys.org

## Acknowledgments

Thanks to all developers and users who have contributed to the AutoScan project! Your support and contributions are the driving force for the project's continuous development.
