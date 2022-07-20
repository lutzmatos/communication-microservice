package br.com.sys.productapi.modules.product.service;

import br.com.sys.productapi.config.exception.ValidationException;
import br.com.sys.productapi.config.response.SuccessResponse;
import br.com.sys.productapi.modules.category.dto.CategoryResponse;
import br.com.sys.productapi.modules.category.model.Category;
import br.com.sys.productapi.modules.category.service.CategoryService;
import br.com.sys.productapi.modules.product.dto.ProductRequest;
import br.com.sys.productapi.modules.product.dto.ProductResponse;
import br.com.sys.productapi.modules.product.model.Product;
import br.com.sys.productapi.modules.product.repository.ProductRepository;
import br.com.sys.productapi.modules.supplier.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.util.ObjectUtils.isEmpty;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SupplierService supplierService;
    @Autowired
    private CategoryService categoryService;

    public Product findById(Integer id) {

        if (isEmpty(id)) {
            throw new ValidationException("The product identification must be informed");
        }

        return productRepository.findById(id)
                .orElseThrow(() -> new ValidationException("There is no product for the given ID."));
    }

    public ProductResponse findByIdResponse(Integer id) {
        return ProductResponse.of(this.findById(id));
    }

    public List<ProductResponse> findAll() {
        return this.productRepository
                .findAll()
                .stream()
                .map(ProductResponse::of)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> findByName(String name) {

        if (isEmpty(name)) {
            throw new ValidationException("The category description must be informed");
        }

        return this.productRepository
                .findByNameIgnoreCaseContaining(name)
                .stream()
                .map(ProductResponse::of)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> findByCategoryId(Integer categoryId) {

        if (isEmpty(categoryId)) {
            throw new ValidationException("The category ID must be informed");
        }

        return this.productRepository
                .findByCategoryId(categoryId)
                .stream()
                .map(ProductResponse::of)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> findBySupplierId(Integer supplierId) {

        if (isEmpty(supplierId)) {
            throw new ValidationException("The supplier ID must be informed");
        }

        return this.productRepository
                .findBySupplierId(supplierId)
                .stream()
                .map(ProductResponse::of)
                .collect(Collectors.toList());
    }

    public ProductResponse save(ProductRequest request) {
        this.validate(request);
        var category = this.categoryService.findById(request.getCategoryId());
        var supplier = this.supplierService.findById(request.getSupplierId());
        var product = this.productRepository.save(Product.of(request, category, supplier));
        return ProductResponse.of(product);
    }

    public ProductResponse updateById(ProductRequest request, Integer id) {
        this.validate(request);
        this.validateInformedId(id);
        var category = this.categoryService.findById(request.getCategoryId());
        var supplier = this.supplierService.findById(request.getSupplierId());
        var product = Product.of(request, category, supplier);
        product.setId(id);
        this.productRepository.save(product);
        return ProductResponse.of(product);
    }

    public Boolean existsByCategoryId(Integer categoryId)
    {
        return this.productRepository.existsByCategoryId(categoryId);
    }

    public Boolean existsBySupplierId(Integer supplierId)
    {
        return this.productRepository.existsBySupplierId(supplierId);
    }

    public SuccessResponse deleteById (Integer id) {
        this.validateInformedId(id);
        this.productRepository.deleteById(id);
        return SuccessResponse.create("The product was deleted");
    }

    private void validateInformedId(Integer id) {
        if (isEmpty(id))
        {
            throw new ValidationException("The product ID was not informed");
        }
    }

    private void validate(ProductRequest request) {

        // Validação do nome
        if (isEmpty(request.getName()))
        {
            throw new ValidationException("The product name was not informed");
        }

        // Validação da quantidade
        if (request.getCategoryId() < 0)
        {
            throw new ValidationException("The product quantity was not informed");
        }

        // Validação do fornecedor
        if (isEmpty(request.getSupplierId()))
        {
            throw new ValidationException("The product supplier was not informed");
        }

        // Validação da categoria
        if (isEmpty(request.getCategoryId()))
        {
            throw new ValidationException("The product category was not informed");
        }

    }

}
