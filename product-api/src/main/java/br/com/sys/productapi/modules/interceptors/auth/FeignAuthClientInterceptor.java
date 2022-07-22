package br.com.sys.productapi.modules.interceptors.auth;

import br.com.sys.productapi.config.exception.ValidationException;
import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

public class FeignAuthClientInterceptor implements RequestInterceptor {

    private static final String AUTHORIZATION = "Authorization";

    @Override
    public void apply(RequestTemplate template) {

        var currentRequest = this.getCurrentRequest();
        template
                .header(AUTHORIZATION, this.getCurrentRequest().getHeader(AUTHORIZATION));
    }

    private HttpServletRequest getCurrentRequest() {
        try {
            return ((ServletRequestAttributes) RequestContextHolder
                    .getRequestAttributes())
                    .getRequest();
        } catch (Exception exception) {
            exception.printStackTrace();
            throw new ValidationException("The current request could not be processed");
        }
    }
}
