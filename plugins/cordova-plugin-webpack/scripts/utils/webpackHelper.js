"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var interpret = __importStar(require("interpret"));
var rechoir = __importStar(require("rechoir"));
var findup_sync_1 = __importDefault(require("findup-sync"));
exports.defaultWebpackConfigPath = function (cwd) {
    var extensions = Object.keys(interpret.extensions);
    var defaultConfigFileNames = ['webpack.config', 'webpackfile'];
    var configFileRegExp = "(" + defaultConfigFileNames.join('|') + ")(" + extensions.join('|') + ")";
    var configPath = findup_sync_1.default(configFileRegExp, {
        cwd: cwd,
    });
    return configPath;
};
exports.webpackConfig = function (cwd, configPath) {
    var reslvedConfigPath = (function () {
        if (!configPath) {
            return exports.defaultWebpackConfigPath(cwd);
        }
        if (path.isAbsolute(configPath)) {
            return path.resolve(configPath);
        }
        return path.resolve(cwd, configPath);
    })();
    rechoir.prepare(interpret.extensions, reslvedConfigPath);
    var config = require(reslvedConfigPath);
    return config.default || config;
};
//# sourceMappingURL=webpackHelper.js.map