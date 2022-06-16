"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const common_1 = require("@nestjs/common");
function handleError(error) {
    var _a, _b;
    const errorLines = (_a = error.message) === null || _a === void 0 ? void 0 : _a.split('\n');
    const lestErrorLine = (_b = errorLines[errorLines.length - 1]) === null || _b === void 0 ? void 0 : _b.trim();
    if (!lestErrorLine) {
        console.error(error);
    }
    throw new common_1.UnprocessableEntityException(lestErrorLine || 'Algum erro ocorreu ao executar a operação!');
}
exports.handleError = handleError;
