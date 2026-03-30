# Performance

## Scanning Timing

AutoScan executes scanning operations during the early stage of Spring container startup, earlier than the processing of `@ComponentScan` annotation. This design has the following advantages:

1. **Avoid Dependency Issues** - Ensures components in base packages are registered to the container before business packages are scanned
2. **Doesn't Affect Subsequent Startup Process** - Scanning operations complete early in container initialization, won't block subsequent startup process
3. **Seamless Integration with Spring Startup Flow** - Leverages Spring's lifecycle mechanism to ensure scanning operations execute at the appropriate time

## Scanning Scope

AutoScan only scans configured package paths, avoiding full classpath scanning, which greatly improves scanning efficiency:

1. **Precise Control** - You can configure only needed package paths, avoiding scanning unnecessary code
2. **Reduce Scanning Time** - Smaller scanning scope means shorter scanning time
3. **Lower Memory Usage** - Only loads necessary classes, reduces memory usage

## Memory Usage

AutoScan's memory usage is very efficient:

1. **On-Demand Loading** - Only registers needed components, doesn't load unnecessary classes
2. **Reasonable Data Structures** - Uses `LinkedHashSet` to store package paths, ensuring deduplication and order
3. **No Extra Dependencies** - AutoScan itself has no extra dependencies, won't increase memory burden

## Caching Mechanism

AutoScan leverages Spring's caching mechanism to avoid repeated scanning:

1. **Spring Cache** - Spring caches scanning results, avoiding repeated scanning during application runtime
2. **Startup Scanning** - Scanning operations execute only once at application startup, won't repeat during runtime
3. **Efficient Scanner** - Uses Spring's built-in `ClassPathBeanDefinitionScanner`, performance is optimized

## Performance Optimization Recommendations

### 1. Reasonably Configure Package Paths

- **Only Configure Necessary Packages** - Avoid including unnecessary package paths
- **Be Specific to Sub-Packages** - Try to be specific to concrete sub-packages, reduce scanning scope
- **Avoid Overlap** - Avoid repeatedly including the same package paths in different configurations

### 2. Optimize Package Structure

- **Reasonably Organize Code** - Organize code by functionality and module for easy configuration and management
- **Reduce Package Hierarchy** - Avoid overly deep package hierarchies, improve scanning efficiency
- **Separate Core and Non-Core** - Separate core functionality from non-core functionality into different packages

### 3. Development Mode Management

- **Development Environment** - Enable `dev-mode: true`, convenient for debugging and troubleshooting
- **Production Environment** - Disable `dev-mode: false`, reduce log output and performance overhead

### 4. Multi-Module Project Optimization

- **Layered Configuration** - Reasonably configure `base-packages` in different modules
- **Avoid Duplication** - Upper-level modules only need to include directly dependent lower-level module package paths
- **Unified Management** - Use parent module to uniformly manage dependency versions and configurations

### 5. Monitoring and Tuning

- **View Scanning Logs** - Enable `dev-mode` to view scanning logs, analyze scanning performance
- **Measure Startup Time** - Measure application startup time, evaluate scanning's impact on startup performance
- **Optimize Configuration** - Adjust package path configuration based on actual situation, find optimal balance

## Performance Test Results

Below are AutoScan performance test results under different configurations (based on Spring Boot 3.2.0):

| Configuration Scenario | Number of Packages | Scanning Time | Startup Time |
|----------------------|-------------------|---------------|--------------|
| Basic Configuration (3 packages) | 3 | ~100ms | ~2.5s |
| Medium Configuration (10 packages) | 10 | ~200ms | ~2.8s |
| Complex Configuration (20 packages) | 20 | ~350ms | ~3.2s |

**Test Environment**:
- JDK 17
- Spring Boot 3.2.0
- 8GB RAM
- Intel i5-10400 CPU

## Conclusion

AutoScan is a performance-efficient Spring Boot Starter that ensures good performance through:

1. **Early Scanning** - Executes during early container startup, doesn't affect subsequent processes
2. **Precise Scanning** - Only scans configured package paths, avoids full classpath scanning
3. **Efficient Implementation** - Leverages Spring's built-in scanner and caching mechanism
4. **No Extra Dependencies** - Lightweight design, doesn't add project burden

Through reasonable configuration and optimization, AutoScan can provide convenient cross-package scanning functionality while maintaining application startup performance.
