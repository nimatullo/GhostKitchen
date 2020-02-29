package com.example.ghostkitchen.jwt;

import com.example.ghostkitchen.model.Credentials;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;

/**
 * Verify the credentials from requests.
 */
public class JwtAuthentificationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;

    public JwtAuthentificationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,HttpServletResponse response) throws AuthenticationException {
        try {
            Credentials authenticationRequest = new ObjectMapper().readValue(request.getInputStream(),Credentials.class);
            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
                            authenticationRequest.getPassword());
            return authenticationManager.authenticate(authentication);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {

        String secretKey = "50cc31c862ddbd698d4d2e353bc3ea6f7d1feb1453428d8a60280dfe3fa2884c";
        String token = Jwts.builder()
                .setSubject(authResult.getName())
                .claim("authorities",authResult.getAuthorities())
                .setIssuedAt(new Date())
                .setExpiration(java.sql.Date.valueOf(LocalDate.now().plusDays(2)))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();
        response.addHeader("Authorization", "Bearer " + token);
    }
}
