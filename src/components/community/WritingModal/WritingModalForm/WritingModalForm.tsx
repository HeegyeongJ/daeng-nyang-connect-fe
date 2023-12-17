import { useDispatch, useSelector } from 'react-redux';
import {
	CommunityState,
	SET_CATEGORY,
	SET_GENDER,
	SET_GET_ALL_BOARD,
	SET_INPUT_VALUE,
	SET_KIND_PET,
} from '../../../../slice/communitySlice';
import {
	ButtonWrap,
	CheckInput,
	InfoWrap,
	InputWrap,
	LabelTitle,
	LabelWrap,
	ModalForm,
	StyledIoClose,
	TextInput,
	Title,
	TitleAndButtonWrap,
} from './WritingModalForm.style';
import { ChangeEvent, useEffect, useState } from 'react';
import { useResponsive } from '../../../../hooks/useResponsive';
import { getAllBoard, postBoard } from '../../../../api/communityApi';
import { useNavigate } from 'react-router-dom';
import { Board } from '../../../../types/BoardTypes';
import usePagination from '../../../../hooks/usePagination';
import { useQuery } from 'react-query';

interface RootState {
	community: CommunityState;
}

interface CommunityNavProps {
	setIsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}
interface FileMetadata {
	name: string;
	size: number;
	type: string;
	lastModified: number;
}

interface ComponentState {
	filesMetadata: FileMetadata[];
	selectedFiles: File[];
}

const WritingModalForm = ({ setIsPopUp }: CommunityNavProps) => {
	const [inputValue, setInputValue] = useState({
		place: '',
		date: '',
		time: '',
		breed: '',
		color: '',
		mobile: '',
		reward: 0,
		text: '',
		title: '',
	});
	const [state, setState] = useState<ComponentState>({
		filesMetadata: [],
		selectedFiles: [],
	});
	const dispatch = useDispatch();
	const displayLabel = useSelector(
		(state: RootState) => state.community.displayLabel,
	);
	const petKind = useSelector((state: RootState) => state.community.kind);
	const category = useSelector((state: RootState) => state.community.category);
	const gender = useSelector((state: RootState) => state.community.gender);

	const communityState = useSelector((state: RootState) => state.community);

	const navigate = useNavigate();

	useEffect(() => {
		console.log('communityState', communityState);
	}, [communityState]);

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const updatedInputValue = { ...inputValue, [name]: value };

		setInputValue(updatedInputValue);
		dispatch(SET_INPUT_VALUE(updatedInputValue));
	};

	const textareaChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		const updatedInputValue = { ...inputValue, [name]: value };

		setInputValue(updatedInputValue);
		dispatch(SET_INPUT_VALUE(updatedInputValue));
	};

	const { $isMobile } = useResponsive();

	const radioChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		switch (name) {
			case 'petKind':
				dispatch(SET_KIND_PET(value));
				break;
			case 'tip':
			case 'mate':
			case 'lost':
				dispatch(SET_CATEGORY(value));
				break;
			case 'gender':
				dispatch(SET_GENDER(value));
				break;
			default:
				break;
		}
	};

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const filesMetadata: FileMetadata[] = Array.from(e.target.files).map(
				(file) => ({
					name: file.name,
					size: file.size,
					type: file.type,
					lastModified: file.lastModified,
				}),
			);

			setState({
				filesMetadata,
				selectedFiles: Array.from(e.target.files),
			});
		}
	};

	const closeThePopUp = () => {
		setIsPopUp(false);
		document.body.style.overflow = 'visible';
	};

	const fetchPostBoardHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const postData = {
			...communityState,
			images: state.selectedFiles,
		};
		const response = await postBoard(
			displayLabel === '나의 댕냥이'
				? 'my_pet'
				: displayLabel === '댕냥 꿀팁'
				  ? 'tips'
				  : displayLabel === '댕냥 메이트'
				    ? 'mate'
				    : 'lost',
			postData,
		);
		console.log(response);
		navigate(
			`/community/${
				displayLabel === '나의 댕냥이'
					? 'myPets'
					: displayLabel === '댕냥 꿀팁'
					  ? 'tips'
					  : displayLabel === '댕냥 메이트'
					    ? 'mates'
					    : 'losts'
			}`,
		);

		dispatch(SET_GET_ALL_BOARD(data));
		refetch();
		setIsPopUp(false);
		document.body.style.overflow = 'visible';
	};

	console.log(state);

	const fetchGetAllBoard = async (): Promise<Board[]> => {
		const response = await getAllBoard(
			displayLabel === '나의 댕냥이'
				? 'myPets'
				: displayLabel === '댕냥 꿀팁'
				  ? 'tips'
				  : displayLabel === '댕냥 메이트'
				    ? 'mates'
				    : 'losts',
			displayLabel === '나의 댕냥이' || displayLabel === '댕냥 미아센터'
				? ''
				: String(currentPage),
		);
		console.log('response', response);

		return response;
	};

	const { data, refetch } = useQuery<Board[]>('tipAllBoard', fetchGetAllBoard);
	const itemsPerPage = 20;

	const { currentPage } = usePagination(data && data.length, itemsPerPage);

	console.log('data', data);

	return (
		<ModalForm onSubmit={fetchPostBoardHandler}>
			<TitleAndButtonWrap>
				<Title>{displayLabel} 글쓰기</Title>
				<button onClick={closeThePopUp}>
					<StyledIoClose />
				</button>
			</TitleAndButtonWrap>
			<InfoWrap>
				{(displayLabel === '댕냥 꿀팁' ||
					displayLabel === '댕냥 메이트' ||
					displayLabel === '댕냥 미아센터') && (
					<LabelWrap>
						<LabelTitle htmlFor="category" $isMobile={$isMobile}>
							카테고리
						</LabelTitle>
						<InputWrap $isMobile={$isMobile}>
							<div>
								<label
									htmlFor={
										displayLabel === '댕냥 꿀팁'
											? 'item'
											: displayLabel === '댕냥 메이트'
											  ? 'mate'
											  : 'find'
									}>
									{displayLabel === '댕냥 꿀팁'
										? '용품 리뷰'
										: displayLabel === '댕냥 메이트'
										  ? '산책 메이트'
										  : '찾아주세요'}
								</label>
								<CheckInput
									type="radio"
									name={
										displayLabel === '댕냥 꿀팁'
											? 'tip'
											: displayLabel === '댕냥 메이트'
											  ? 'mate'
											  : 'lost'
									}
									value={
										displayLabel === '댕냥 꿀팁'
											? 'item'
											: displayLabel === '댕냥 메이트'
											  ? 'mate'
											  : 'find'
									}
									onChange={radioChangeHandler}
									checked={
										displayLabel === '댕냥 꿀팁'
											? category === 'item'
											: displayLabel === '댕냥 메이트'
											  ? category === 'mate'
											  : category === 'find'
									}
								/>
							</div>
							<div>
								<label
									htmlFor={
										displayLabel === '댕냥 꿀팁'
											? 'center'
											: displayLabel === '댕냥 메이트'
											  ? 'care'
											  : 'found'
									}>
									{displayLabel === '댕냥 꿀팁'
										? '병원 리뷰'
										: displayLabel === '댕냥 메이트'
										  ? '맡아주실 분'
										  : '발견했어요'}
								</label>
								<CheckInput
									type="radio"
									name={
										displayLabel === '댕냥 꿀팁'
											? 'tip'
											: displayLabel === '댕냥 메이트'
											  ? 'mate'
											  : 'lost'
									}
									value={
										displayLabel === '댕냥 꿀팁'
											? 'center'
											: displayLabel === '댕냥 메이트'
											  ? 'care'
											  : 'found'
									}
									onChange={radioChangeHandler}
									checked={
										displayLabel === '댕냥 꿀팁'
											? category === 'center'
											: displayLabel === '댕냥 메이트'
											  ? category === 'care'
											  : category === 'found'
									}
								/>
							</div>
							{displayLabel === '댕냥 꿀팁' && (
								<div>
									<label htmlFor="etc">그 외</label>
									<CheckInput
										type="radio"
										name="tip"
										value="etc"
										onChange={radioChangeHandler}
										checked={category === 'etc'}
									/>
								</div>
							)}
						</InputWrap>
					</LabelWrap>
				)}
				{(displayLabel === '댕냥 메이트' ||
					displayLabel === '댕냥 미아센터') && (
					<LabelWrap>
						<LabelTitle htmlFor="place" $isMobile={$isMobile}>
							장소
						</LabelTitle>
						<TextInput
							type="text"
							name="place"
							value={inputValue.place}
							onChange={inputChangeHandler}
							$isMobile={$isMobile}
						/>
					</LabelWrap>
				)}
				{displayLabel === '댕냥 미아센터' && (
					<LabelWrap>
						<LabelTitle htmlFor="lost_date" $isMobile={$isMobile}>
							날짜
						</LabelTitle>
						<TextInput
							type="date"
							name="date"
							value={inputValue.date}
							onChange={inputChangeHandler}
							$isMobile={$isMobile}
						/>
					</LabelWrap>
				)}
				{displayLabel === '댕냥 미아센터' && (
					<LabelWrap>
						<LabelTitle htmlFor="lost_time" $isMobile={$isMobile}>
							시간
						</LabelTitle>
						<TextInput
							type="time"
							name="time"
							value={inputValue.time}
							onChange={inputChangeHandler}
							$isMobile={$isMobile}
						/>
					</LabelWrap>
				)}
				{displayLabel === '댕냥 꿀팁' && (
					<LabelWrap>
						<LabelTitle htmlFor="title" $isMobile={$isMobile}>
							제목
						</LabelTitle>
						<TextInput
							type="text"
							name="title"
							value={inputValue.title}
							onChange={inputChangeHandler}
							$isMobile={$isMobile}
						/>
					</LabelWrap>
				)}
				{(displayLabel === '나의 댕냥이' ||
					displayLabel === '댕냥 미아센터') && (
					<LabelWrap>
						<LabelTitle htmlFor="kind" $isMobile={$isMobile}>
							반려동물 종류
						</LabelTitle>
						<InputWrap $isMobile={$isMobile}>
							<div>
								<label htmlFor="dog">강아지</label>
								<CheckInput
									type="radio"
									name="petKind"
									value="dog"
									onChange={radioChangeHandler}
									checked={petKind === 'dog'}
								/>
							</div>
							<div>
								<label htmlFor="cat">고양이</label>
								<CheckInput
									type="radio"
									name="petKind"
									value="cat"
									onChange={radioChangeHandler}
									checked={petKind === 'cat'}
								/>
							</div>
							<div>
								<label htmlFor="etc">그 외</label>
								<CheckInput
									type="radio"
									name="petKind"
									value="etc"
									onChange={radioChangeHandler}
									checked={petKind === 'etc'}
								/>
							</div>
						</InputWrap>
					</LabelWrap>
				)}
				{displayLabel === '댕냥 미아센터' && (
					<LabelWrap>
						<LabelTitle htmlFor="breed" $isMobile={$isMobile}>
							품종
						</LabelTitle>
						<TextInput
							type="text"
							name="breed"
							value={inputValue.breed}
							onChange={inputChangeHandler}
							$isMobile={$isMobile}
						/>
					</LabelWrap>
				)}
				{displayLabel === '댕냥 미아센터' && (
					<LabelWrap>
						<LabelTitle htmlFor="kind" $isMobile={$isMobile}>
							성별
						</LabelTitle>
						<InputWrap $isMobile={$isMobile}>
							<div>
								<label htmlFor="male">남자</label>
								<CheckInput
									type="radio"
									name="gender"
									value="male"
									onChange={radioChangeHandler}
									checked={gender === 'male'}
								/>
							</div>
							<div>
								<label htmlFor="female">여자</label>
								<CheckInput
									type="radio"
									name="gender"
									value="female"
									onChange={radioChangeHandler}
									checked={gender === 'female'}
								/>
							</div>
							<div>
								<label htmlFor="middle">중성</label>
								<CheckInput
									type="radio"
									name="gender"
									value="middle"
									onChange={radioChangeHandler}
									checked={gender === 'middle'}
								/>
							</div>
						</InputWrap>
					</LabelWrap>
				)}
				{displayLabel === '댕냥 미아센터' && (
					<LabelWrap>
						<LabelTitle htmlFor="color" $isMobile={$isMobile}>
							색깔
						</LabelTitle>
						<TextInput
							type="text"
							name="color"
							value={inputValue.color}
							onChange={inputChangeHandler}
							$isMobile={$isMobile}
						/>
					</LabelWrap>
				)}
				{displayLabel === '댕냥 미아센터' && (
					<LabelWrap>
						<LabelTitle htmlFor="mobile" $isMobile={$isMobile}>
							전화번호
						</LabelTitle>
						<TextInput
							type="tel"
							placeholder="000-0000-0000 형식으로 입력해주세요."
							name="mobile"
							value={inputValue.mobile}
							onChange={inputChangeHandler}
							$isMobile={$isMobile}
						/>
					</LabelWrap>
				)}
				{displayLabel === '댕냥 미아센터' && (
					<LabelWrap>
						<LabelTitle htmlFor="reward" $isMobile={$isMobile}>
							사례금
						</LabelTitle>
						<TextInput
							type="number"
							step="10000"
							name="reward"
							value={inputValue.reward}
							onChange={inputChangeHandler}
							$isMobile={$isMobile}
						/>
					</LabelWrap>
				)}
				<LabelWrap>
					<LabelTitle htmlFor="text" $isMobile={$isMobile}>
						상세 설명
					</LabelTitle>
					<textarea
						name="text"
						id="text"
						value={inputValue.text}
						onChange={textareaChangeHandler}></textarea>
				</LabelWrap>
				<LabelWrap>
					<LabelTitle htmlFor="images" $isMobile={$isMobile}>
						이미지 등록
					</LabelTitle>
					<input type="file" multiple onChange={handleImageChange} />
				</LabelWrap>
			</InfoWrap>
			<ButtonWrap>
				<button type="submit">등록하기</button>
			</ButtonWrap>
		</ModalForm>
	);
};

export default WritingModalForm;
