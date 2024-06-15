import { Injectable, NestMiddleware, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/models';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';


@Injectable()
export class isLoggedin implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const token = request.cookies.__authToken;
        if (!token) return response.redirect('/');

        try {
            const decoded = await this.jwtService.verifyAsync(token, { secret: '@fusion' });
            if (decoded) return true;
            return response.redirect('/');
        } catch (error) {
            console.log("this is error", error);
            return false;
        }
    } 
}



@Injectable()
export class isNotLoggedin implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const token = request.cookies.__authToken;
        if (token) return response.redirect('/');
        return true;
    } 
}



@Injectable()
export class checkAuth implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const token = request.cookies.__authToken;
        if (!token) return response.json({ error: "You're Unauthorized" })
        return true;
    } 
}



@Injectable()
export class UserDataMiddleware implements NestMiddleware {
    constructor(
        @InjectRepository(UsersEntity)
        private userRepo: Repository<UsersEntity>,
        private jwtService: JwtService,
    ) { }

    async use(request: Request, response: Response, next: NextFunction) {
        const token = request.cookies.__authToken;

        if (!token) {
            response.locals.user = null;
            return next();
        }else{
            try {
                const decoded = await this.jwtService.verifyAsync(token, {secret: '@fusion'});
                const user = await this.userRepo.findOne({where: {id: decoded.id}});
                if (!user) {
                    response.clearCookie('__authToken', {httpOnly: true, secure: false})
                    response.locals.user = null;
                    next();
                }else{
                    response.locals.user = user;
                    next();
                }
            } catch (error) {
                response.locals.user = null;
                next();
            }
        }
    }
}