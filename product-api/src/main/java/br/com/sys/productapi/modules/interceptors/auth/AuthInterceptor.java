package br.com.sys.productapi.modules.interceptors.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.sys.productapi.modules.jwt.service.AuthJwtService;

import static org.springframework.cloud.openfeign.security.OAuth2FeignRequestInterceptor.AUTHORIZATION;

public class AuthInterceptor implements HandlerInterceptor {

    @Autowired
    private AuthJwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {

        if (this.isOptions(request)) {
            return true;
        }

        var authorization = request.getHeader(AUTHORIZATION);
        this.jwtService.validateAuthorization(authorization);

        return true;
        //return HandlerInterceptor.super.preHandle(request, response, handler);
    }

    private Boolean isOptions(HttpServletRequest request) {
        if (HttpMethod.OPTIONS.name().equals(request.getMethod())) {
            return true;
        }
        return false;
    }

}
