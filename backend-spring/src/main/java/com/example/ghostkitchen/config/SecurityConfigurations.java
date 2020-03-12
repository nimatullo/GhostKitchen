package com.example.ghostkitchen.config;

import com.example.ghostkitchen.jwt.JwtAuthEntryPoint;
import com.example.ghostkitchen.jwt.JwtAuthentificationFilter;
import com.example.ghostkitchen.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true, //Allows for @Secured annotation
        jsr250Enabled = true, // Allows for @RolesAllowed annotation
        prePostEnabled = true //Allows for @PreAuthorize or @PostAuthorize annotations
)
@ComponentScan(value = "com.example.ghostkitchen.service")
public class SecurityConfigurations extends WebSecurityConfigurerAdapter {
    @Autowired
    CustomUserDetailsService customUserDetailsService;

    /**
     * Returns 401 error if user's not authorized.
     */
    @Autowired
    private JwtAuthEntryPoint unauthorizedHandler;

    /**
     * Reads JWT Auth token
     * Validates it
     * Loads user details associated with that token
     * Sets user details in SecurityContext
     */
    @Bean
    public JwtAuthentificationFilter jwtAuthentificationFilter() {
        return new JwtAuthentificationFilter();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
       auth
               .userDetailsService(customUserDetailsService)
               .passwordEncoder(passwordEncoder());
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().disable()
                .exceptionHandling()
                    .authenticationEntryPoint(unauthorizedHandler)
                .and()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .and()
                .authorizeRequests()
                    .antMatchers("/**/login", "/**/register", "/downloadFile/**")
                        .permitAll()
//                    .antMatchers("/owner/**").hasRole("OWNER")
//                    .antMatchers("/user/**").hasRole("USER")
                .anyRequest()
                .authenticated();
        http.addFilterBefore(jwtAuthentificationFilter(),UsernamePasswordAuthenticationFilter.class);
    }
}
