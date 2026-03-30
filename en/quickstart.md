# Quick Start

## 1. Add Dependency

Add AutoScan dependency to your Maven project's `pom.xml`:

```xml
<dependency>
    <groupId>org.itrys</groupId>
    <artifactId>autoscan-spring-boot-starter</artifactId>
    <version>1.1.0</version>
</dependency>
```

## 2. Configure Base Packages

Configure base packages to scan in `application.yml`:

### Basic Configuration

```yaml
auto-scan:
  base-packages:
    - org.example.boot        # Technical infrastructure
    - org.example.base        # Business infrastructure
    - com.company.framework   # Company framework
  dev-mode: true              # Development mode, output detailed logs
```

### Using Wildcards (v1.1.0+)

```yaml
auto-scan:
  base-packages:
    - org.example.*           # Single-level wildcard
    - com.company.**          # Multi-level wildcard
  dev-mode: true
```

### Exclude Scanning (v1.1.0+)

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-packages:
    - org.example.test        # Exclude test package
  exclude-classes:
    - org.example.demo.DemoClass  # Exclude specific class
  dev-mode: true
```

### Custom Annotations (v1.1.0+)

```yaml
auto-scan:
  base-packages:
    - org.example
  include-annotations:
    - org.springframework.stereotype.Service
    - org.example.annotation.CustomComponent  # Custom annotation
  dev-mode: true
```

## 3. Start Application

```java
package com.company.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication  // Auto-scans com.company.project package and sub-packages
public class ProjectApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProjectApplication.class, args);
    }
}
```

After startup, you'll see scanning logs in the console:

```
>>> [AutoScan] Initializing base package scanner...
>>> [AutoScan] Configured base packages: [org.example.boot, org.example.base, com.company.framework]
>>> [AutoScan] Final packages to scan: [org.example.boot, org.example.base, com.company.framework]
>>> [AutoScan] Successfully registered 58 bean(s) from base packages.
```

## 4. Verify Configuration

After starting the application, you can verify AutoScan is working by:

1. Checking console output for scanning logs
2. Verifying components from base packages are successfully injected
3. Confirming business package components are scanned normally

If everything works correctly, your application should be able to use components from both base packages and business packages.

## 5. Migrating from v1.0.0

v1.1.0 is fully backward compatible with v1.0.0, just update the version:

```xml
<dependency>
    <groupId>org.itrys</groupId>
    <artifactId>autoscan-spring-boot-starter</artifactId>
    <version>1.1.0</version>
</dependency>
```

All existing configurations will continue to work without any changes.

## 6. Experience New Features

### Wildcard Scanning

```yaml
auto-scan:
  base-packages:
    - org.example.*      # Matches org.example.boot, org.example.base, etc.
    - com.company.**     # Matches com.company and all its sub-packages
```

### Exclude Specific Packages and Classes

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-packages:
    - org.example.test   # Exclude test package
  exclude-classes:
    - org.example.demo.DemoClass  # Exclude specific class
```

### Custom Annotation Scanning

```java
// 1. Create custom annotation
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Component
public @interface CustomComponent {
    String value() default "";
}

// 2. Use custom annotation
@CustomComponent
public class CustomService {
    // Business logic
}

// 3. Configure scanning
```

```yaml
auto-scan:
  base-packages:
    - org.example
  include-annotations:
    - org.example.annotation.CustomComponent
```

## 7. Common Issues

### Components not being scanned?

1. Check if `auto-scan.base-packages` configuration is correct
2. Enable `dev-mode: true` to view scanning logs
3. Confirm components use `@Component`, `@Configuration`, or other configured annotations
4. Check if package paths contain unsupported wildcard patterns (v1.1.0+ supports `*` and `**` wildcards)

### How to use wildcards?

- `*` - Matches single-level package (e.g., `org.example.*` matches `org.example.boot`, `org.example.base`, etc.)
- `**` - Matches multi-level packages (e.g., `com.company.**` matches all packages under `com.company`)

### How to exclude specific packages?

```yaml
auto-scan:
  base-packages:
    - org.example
  exclude-packages:
    - org.example.test
    - org.example.example
```

### How to configure custom annotations?

```yaml
auto-scan:
  base-packages:
    - org.example
  include-annotations:
    - org.example.annotation.CustomComponent
```

## 8. Next Steps

- Check [Configuration Guide](configuration.md) for detailed configuration
- Check [Core Features](features.md) for all features
- Check [Use Cases](use-cases.md) for best practices
- Check [FAQ](faq.md) for common questions
