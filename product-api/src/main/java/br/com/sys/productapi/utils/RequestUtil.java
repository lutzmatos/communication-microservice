package br.com.sys.productapi.utils;

import br.com.sys.productapi.config.exception.ValidationException;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

public class RequestUtil {
    public static HttpServletRequest getCurrentRequest() {
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
