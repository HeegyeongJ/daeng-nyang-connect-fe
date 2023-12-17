import { Outlet, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
	Article,
	Button,
	ButtonWrap,
	Nav,
	NavOption,
	NavOptionButton,
	NavOptionText,
	NavOptionWrap,
	SearchWrap,
	StyledIoIosSearch,
	TitleAndSearchWrap,
	TitleWrap,
	MenuAndSearchWrap,
	StyledFaPlus,
} from './CommunityNav.style';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	SET_DISPLAY_LABEL,
	SET_SUB_CATEGORY,
} from '../../../slice/communitySlice';
import { useResponsive } from '../../../hooks/useResponsive';

interface CommunityNavProps {
	setIsPopUp: React.Dispatch<React.SetStateAction<boolean>>;
	isPopUp: boolean;
}

const CommunityNav = ({ setIsPopUp, isPopUp }: CommunityNavProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	const category = queryParams.get('category');

	const dispatch = useDispatch();

	const { $isMaxWidth, $isTablet, $isMobile } = useResponsive();

	const routeLabels: Record<string, string> = {
		'/community/myPets': '나의 댕냥이',
		'/community/tips': '댕냥 꿀팁',
		'/community/mates': '댕냥 메이트',
		'/community/losts': '댕냥 미아센터',
	};

	const currentLabel: string | undefined = Object.keys(routeLabels).find(
		(key) => location.pathname.startsWith(key),
	);

	const displayLabel = currentLabel ? routeLabels[currentLabel] : '나의 댕냥이';

	useEffect(() => {
		dispatch(SET_DISPLAY_LABEL(displayLabel));
	}, [displayLabel]);

	const moveToTheCommunity = (community: string) => {
		navigate(`/community/${community}`);
		dispatch(SET_SUB_CATEGORY(null));
	};

	const moveToTheCategory = (community: string, category: string) => {
		navigate(`/community/${community}?category=${category}`);
		dispatch(SET_SUB_CATEGORY(category));
	};

	return (
		<>
			<TitleAndSearchWrap $isMaxWidth={$isMaxWidth} $isMobile={$isMobile}>
				{!$isMobile && (
					<TitleWrap $isTablet={$isTablet} $isMobile={$isMobile}>
						<span>댕냥 톡톡</span>
						<span>&gt;</span>
						<span>{displayLabel}</span>
					</TitleWrap>
				)}
				<MenuAndSearchWrap>
					<SearchWrap $isMobile={$isMobile} $isTablet={$isTablet}>
						<input type="text" placeholder="검색어를 입력해주세요" />
						<button>
							<StyledIoIosSearch />
						</button>
					</SearchWrap>
				</MenuAndSearchWrap>
			</TitleAndSearchWrap>
			<Article $isMaxWidth={$isMaxWidth} $isMobile={$isMobile}>
				<Nav
					$isMaxWidth={$isMaxWidth}
					$isTablet={$isTablet}
					$isMobile={$isMobile}>
					<ButtonWrap $isMobile={$isMobile}>
						<NavOptionWrap $isMobile={$isMobile}>
							<NavOption
								onClick={() => moveToTheCommunity('myPets')}
								$isTablet={$isTablet}
								$isMobile={$isMobile}>
								<NavOptionText $isActive={displayLabel === '나의 댕냥이'}>
									나의 댕냥이
								</NavOptionText>
							</NavOption>
						</NavOptionWrap>
						<NavOptionWrap $isMobile={$isMobile}>
							<NavOption
								onClick={() => moveToTheCommunity('tips')}
								$isTablet={$isTablet}
								$isMobile={$isMobile}>
								<NavOptionText $isActive={displayLabel === '댕냥 꿀팁'}>
									댕냥 꿀팁
								</NavOptionText>
							</NavOption>
							{displayLabel === '댕냥 꿀팁' && (
								<>
									<NavOptionButton
										onClick={() => moveToTheCategory('tips', 'item')}
										$isTablet={$isTablet}
										$isMobile={$isMobile}>
										<NavOptionText $isActive={category === 'item'}>
											용품 리뷰
										</NavOptionText>
									</NavOptionButton>
									<NavOptionButton
										onClick={() => moveToTheCategory('tips', 'center')}
										$isTablet={$isTablet}
										$isMobile={$isMobile}>
										<NavOptionText $isActive={category === 'center'}>
											병원 리뷰
										</NavOptionText>
									</NavOptionButton>
									<NavOptionButton
										onClick={() => moveToTheCategory('tips', 'etc')}
										$isTablet={$isTablet}
										$isMobile={$isMobile}>
										<NavOptionText $isActive={category === 'etc'}>
											그 외
										</NavOptionText>
									</NavOptionButton>
								</>
							)}
						</NavOptionWrap>
						<NavOptionWrap $isMobile={$isMobile}>
							<NavOption
								onClick={() => moveToTheCommunity('mates')}
								$isTablet={$isTablet}
								$isMobile={$isMobile}>
								<NavOptionText $isActive={displayLabel === '댕냥 메이트'}>
									댕냥 메이트
								</NavOptionText>
							</NavOption>
							{displayLabel === '댕냥 메이트' && (
								<>
									<NavOptionButton
										onClick={() => moveToTheCategory('mates', 'mate')}
										$isTablet={$isTablet}
										$isMobile={$isMobile}>
										<NavOptionText $isActive={category === 'mate'}>
											산책 메이트
										</NavOptionText>
									</NavOptionButton>
									<NavOptionButton
										onClick={() => moveToTheCategory('mates', 'care')}
										$isTablet={$isTablet}
										$isMobile={$isMobile}>
										<NavOptionText $isActive={category === 'care'}>
											맡아주실 분
										</NavOptionText>
									</NavOptionButton>
								</>
							)}
						</NavOptionWrap>
						<NavOptionWrap $isMobile={$isMobile}>
							<NavOption
								onClick={() => moveToTheCommunity('losts')}
								$isTablet={$isTablet}
								$isMobile={$isMobile}>
								<NavOptionText $isActive={displayLabel === '댕냥 미아센터'}>
									댕냥 미아센터
								</NavOptionText>
							</NavOption>
							{displayLabel === '댕냥 미아센터' && (
								<>
									<NavOptionButton
										onClick={() => moveToTheCategory('losts', 'find')}
										$isTablet={$isTablet}
										$isMobile={$isMobile}>
										<NavOptionText $isActive={category === 'find'}>
											찾아주세요
										</NavOptionText>
									</NavOptionButton>
									<NavOptionButton
										onClick={() => moveToTheCategory('losts', 'found')}
										$isTablet={$isTablet}
										$isMobile={$isMobile}>
										<NavOptionText $isActive={category === 'found'}>
											발견했어요
										</NavOptionText>
									</NavOptionButton>
								</>
							)}
						</NavOptionWrap>
					</ButtonWrap>
					{!$isMobile && (
						<Button
							onClick={() => setIsPopUp(true)}
							$isTablet={$isTablet}
							$isMobile={$isMobile}>
							글쓰기
						</Button>
					)}
				</Nav>
				{$isMobile && !isPopUp && (
					<Button
						onClick={() => setIsPopUp(true)}
						$isTablet={$isTablet}
						$isMobile={$isMobile}>
						<StyledFaPlus />
					</Button>
				)}
				<Outlet />
			</Article>
		</>
	);
};

export default CommunityNav;
