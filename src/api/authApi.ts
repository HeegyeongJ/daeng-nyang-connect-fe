import APIClient from './ApiClient';

const SIGNUP = '/signup';
const LOGIN = '/login';
const LOGOUT = '/logout';
const ID_CHECK = '/IdCheck';
const NICKNAME_CHECK = '/NicknameCheck';
const FIND_ID = '/findId';
const FIND_PASSWORD = '/findPassword';
const MY_PAGE = '/myPage';
const BASE_URL = 'http://3.35.16.126:8080';

interface SignupRequestBody {
	email: string;
	password: string;
	name: string;
	nickName: string;
	mobile: string;
	city: string;
	town: string;
	experience: boolean;
	gender: string;
}

interface LoginRequestBody {
	email: string;
	password: string;
}

interface IdCheckRequestBody {
	email: string;
}

interface NicknameCheckRequestBody {
	nickname: string;
}

interface FindIdRequestBody {
	name: string;
	mobile: string;
}

interface FindPasswordRequestBody {
	name: string;
	mobile: string;
	email: string;
	newPassword: string;
}

export const authApi = new APIClient(BASE_URL + '/api');

export const signupUser = async (body: SignupRequestBody): Promise<any> => {
	return await authApi.post(SIGNUP, {
		email: body.email,
		password: body.password,
		name: body.name,
		nickName: body.nickName,
		mobile: body.mobile,
		city: body.city,
		town: body.town,
		experience: body.experience,
		gender: body.gender,
	});
};

export const loginUser = async (body: LoginRequestBody): Promise<any> => {
	return await authApi.post(LOGIN, {
		email: body.email,
		password: body.password,
	});
};

export const logoutUser = async () => {
	return await authApi.post(LOGOUT, {});
};

export const idCheck = async (body: IdCheckRequestBody): Promise<any> => {
	return await authApi.get(ID_CHECK, {
		email: body.email,
	});
};

export const nicknameCheck = async (
	body: NicknameCheckRequestBody,
): Promise<any> => {
	return await authApi.get(NICKNAME_CHECK, {
		nickName: body.nickname,
	});
};

export const findId = async (body: FindIdRequestBody): Promise<any> => {
	return await authApi.get(FIND_ID, {
		name: body.name,
		mobile: body.mobile,
	});
};

export const findPassword = async (
	body: FindPasswordRequestBody,
): Promise<any> => {
	return await authApi.post(FIND_PASSWORD, {
		name: body.name,
		mobile: body.mobile,
		email: body.email,
		newPassword: body.newPassword,
	});
};

export const mypageCheck = async () => {
	return await authApi.get(MY_PAGE, {});
};
