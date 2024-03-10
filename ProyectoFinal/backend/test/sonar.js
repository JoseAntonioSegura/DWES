import sonarqubeScanner from 'sonarqube-scanner';

sonarqubeScanner({
    serverUrl: 'http://localhost:9000',
    options: {
    'sonar.sources': '.',
    'sonar.tests': 'test',
    'sonar.inclusions': '../src/**',
    'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
    'sonar.login': 'admin',
    'sonar.password': 'usuario',
    },
}, () => { });