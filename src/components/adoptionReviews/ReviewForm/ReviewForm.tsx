import {
	CategoryTitle,
	FormText,
	PetRegistrationForm,
} from '../../newFamily/NewFamily.style';

const ReviewForm = () => {
	return (
		<PetRegistrationForm>
			<CategoryTitle>
				<h1>입양 후기 등록하기</h1>
			</CategoryTitle>
			<div>
				<FormText>
					<div>
						<h5>동물 이름</h5>
						<input type="text" name="animal_name" id="animal_name" required />
					</div>
					<div>
						<h5>품종</h5>
						<input type="text" name="breed" id="breed" required />
						<h5>/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 나이</h5>
						<input type="text" name="age" id="age" required />
					</div>
					<div>
						<h5>성별</h5>
						<input type="radio" name="gender" id="male" />
						<label htmlFor="male">남</label>
						<input type="radio" name="gender" id="female" />
						<label htmlFor="female">여</label>
					</div>
					<div>
						<h5>중성화 여부</h5>
						<input type="radio" name="neutralization" id="neutralization_yes" />
						<label htmlFor="neutralization_yes">예</label>
						<input type="radio" name="neutralization" id="neutralization_no" />
						<label htmlFor="neutralization_no">아니오</label>
					</div>
					<div>
						<h5>입양 시기</h5>
						<input
							type="text"
							name="period"
							id="period"
							placeholder="2023년 8월"
							required
						/>
					</div>
					<div>
						<h5>이미지 등록</h5>
						<input type="file" name="img" id="img" required />
					</div>
					<div className="text-box">
						<h5>특이 사항</h5>
						<textarea name="" id=""></textarea>
					</div>
				</FormText>
				<button type="submit">등록하기</button>
			</div>
		</PetRegistrationForm>
	);
};

export default ReviewForm;
