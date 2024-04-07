import sonarqubeScanner from 'sonarqube-scanner';

sonarqubeScanner({
    serverUrl: 'http://localhost:9000',
    options: {
        'sonar.sources': '.',
        'sonar.tests': 'test',
        'sonar.inclusions': '../src/**',
        'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
        'sonar.token': 'sqp_f577be1e1bd386c55f769fd97416e43e319caece',
    },
}, () => { });
