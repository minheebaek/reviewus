package com.example.backend.controller;

import com.example.backend.dto.RefreshTokenDto;
import com.example.backend.dto.request.auth.SignInRequestDto;
import com.example.backend.dto.request.auth.SignUpRequestDto;
import com.example.backend.dto.response.auth.DeleteLogoutDto;
import com.example.backend.dto.response.auth.SignInResponseDto;
import com.example.backend.dto.response.auth.SignUpResponseDto;
import com.example.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    /**
     * 회원가입
     * localhost:8080/signup
     *
     * @return response
     * @parm requestBody
     */
    @PostMapping("/signup")
    public ResponseEntity<? super SignUpResponseDto> signUp(
            @RequestBody @Valid SignUpRequestDto requestBody
    ) {
        ResponseEntity<? super SignUpResponseDto> response = authService.signUp(requestBody);
        return response;
    }

    /**
     * 로그인
     * localhost:8080/signin
     *
     * @return response
     * @parm requestBody
     */
    @PostMapping("/signin")
    public ResponseEntity<? super SignInResponseDto> login(@RequestBody @Valid SignInRequestDto requestBody) {
        ResponseEntity<? super SignInResponseDto> response = authService.signIn(requestBody);
        return response;

    }
    /**
     * 로그아웃
     * localhost:8080/logout
     *
     * @parm requestBody
     * @return response
     */

    @DeleteMapping("/logout")
    public ResponseEntity<? super DeleteLogoutDto> logout(@RequestBody RefreshTokenDto requestBody) {
        ResponseEntity<? super DeleteLogoutDto> response = authService.logout(requestBody);
        return response;

    }

    /*1. 전달받은 유저의 아이디로 유저가 존재하는지 확인한다.
    2. RefreshToken이 유효한지 체크한다.
    3. AccessToken을 발급하여 기존 RefreshToken과 함께 응답한다.*/


    /**
     * refreshToken 발급
     * localhost:8080/refreshToken
     *
     * @return response
     * @parm requestBody
     */
    @PostMapping("/refreshToken")
    public ResponseEntity<? super SignInResponseDto> login(@RequestBody RefreshTokenDto requestBody) {
        ResponseEntity<? super SignInResponseDto> response = authService.refreshToken(requestBody);
        return response;

    }
}