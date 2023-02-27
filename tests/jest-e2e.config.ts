import jestConfig from './../jest.config';

export default {
    ...jestConfig,
    rootDir: '../',
    testRegex: '.e2e-spec.ts$',
};
