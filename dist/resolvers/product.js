"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResolver = void 0;
const Product_1 = require("../entities/Product");
const type_graphql_1 = require("type-graphql");
let ProductInput = class ProductInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProductInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProductInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ProductInput.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], ProductInput.prototype, "countInStock", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProductInput.prototype, "imageUrl", void 0);
ProductInput = __decorate([
    (0, type_graphql_1.InputType)()
], ProductInput);
let ProductResolver = class ProductResolver {
    async products() {
        return Product_1.Product.find();
    }
    product(id) {
        return Product_1.Product.findOne({ where: { id } });
    }
    async createProduct(input) {
        return Product_1.Product.create(Object.assign({}, input)).save();
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Product_1.Product]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "products", null);
__decorate([
    (0, type_graphql_1.Query)(() => Product_1.Product, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "product", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Product_1.Product),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "createProduct", null);
ProductResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ProductResolver);
exports.ProductResolver = ProductResolver;
//# sourceMappingURL=product.js.map