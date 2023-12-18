import { BsBookmarkFill } from 'react-icons/bs';
import { RiMore2Line } from 'react-icons/ri';
import {
	DetailImageBox,
	DetailTextBox,
	MoreDropdown,
	NewFamilyDetailContainer,
	UserThumbnail,
} from '../NewFamily.style';
import { useLocation, useNavigate } from 'react-router-dom';
import NewFamilySwiper from './NewFamilySwiper';
import { useState } from 'react';
import { useResponsive } from '../../../hooks/useResponsive';
import { useDispatch } from 'react-redux';
import { MOVE_TO_CHAT } from '../../../slice/chatSlice';

const NewFamilyDetail = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const imageUrl = location.state?.imageUrl || '';
	const [clickedBookmark, setClickedBookmark] = useState(false);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();
	const dispatch = useDispatch();

	const toggleDropdown = () => {
		setIsDropdownVisible((prev) => !prev);
	};

	const clickBookmarkHandler = () => {
		setClickedBookmark((prev) => !prev);
	};

	const getMoreBtnSize = () => {
		if ($isMobile) return 20;
		if ($isTablet) return 30;
		if ($isPc) return 30;
	};

	const moveToChatHandler = () => {
		const data = {
			animalId: 6,
			animalName: '나나',
			age: '1년',
			breed: '말티즈',
		};
		dispatch(MOVE_TO_CHAT(data));
		navigate('');
	};

	return (
		<div>
			<NewFamilyDetailContainer
				$isMobile={$isMobile}
				$isTablet={$isTablet}
				$isPc={$isPc}
				$isMaxWidth={$isMaxWidth}>
				<UserThumbnail
					$isMobile={$isMobile}
					$isTablet={$isTablet}
					$isPc={$isPc}
					$isMaxWidth={$isMaxWidth}
					className="user-box-mobile">
					<div>
						<img src="/assets/animal2.jpg" alt="" />
					</div>
					<h5>iamzipsa</h5>
					<RiMore2Line
						color="var(--color-light-salmon"
						size={getMoreBtnSize()}
						onClick={toggleDropdown}
					/>
					{isDropdownVisible && (
						<MoreDropdown
							$isMobile={$isMobile}
							$isTablet={$isTablet}
							$isPc={$isPc}
							$isMaxWidth={$isMaxWidth}>
							<li>수정하기</li>
							<li>삭제하기</li>
						</MoreDropdown>
					)}
				</UserThumbnail>
				<DetailImageBox
					$isMobile={$isMobile}
					$isTablet={$isTablet}
					$isPc={$isPc}
					$isMaxWidth={$isMaxWidth}>
					<img src={imageUrl} alt="" />
					<BsBookmarkFill
						color={clickedBookmark ? 'var(--color-light-salmon)' : '#ffffff70'}
						size={40}
						onClick={clickBookmarkHandler}
					/>
				</DetailImageBox>
				<div>
					<UserThumbnail
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}
						className="user-box-pc">
						<div>
							<img src="/assets/animal2.jpg" alt="" />
						</div>
						<h5>iamzipsa</h5>
						<RiMore2Line
							color="var(--color-light-salmon"
							size={30}
							onClick={toggleDropdown}
						/>
						{isDropdownVisible && (
							<MoreDropdown
								$isMobile={$isMobile}
								$isTablet={$isTablet}
								$isPc={$isPc}
								$isMaxWidth={$isMaxWidth}>
								<li>수정하기</li>
								<li>삭제하기</li>
							</MoreDropdown>
						)}
					</UserThumbnail>
					<DetailTextBox
						$isMobile={$isMobile}
						$isTablet={$isTablet}
						$isPc={$isPc}
						$isMaxWidth={$isMaxWidth}>
						<p>이름 : </p>
						<p>나이 : </p>
						<p>품종 : </p>
						<p>질병 : </p>
						<p>훈련 여부: </p>
						<p>중성화 여부 : </p>
						<p>검강검진 여부 :</p>
						<p>이별 사유 : </p>
						<p>
							그 외 특이사항:
							dsgfdsghskjgnbdfkjghkufjbvkurdeghowighidfgbwerkithikhdrekaghdkihbdfigberkbvdtgbolsdfhbgtrighsjfklfhjskldklerwtldkdusdgudfgdjfnertmkfvfklgndkjlfsalofszdgfnzsklgndskjlb
							ngbewtbfnjklsdnwelk;nvsd:gbfnjsdkfnbwse;
							SKbfnsjkdFNBejfnsrnfidshfniewfnhidsfnidofnweiofniowtnfdsiofnweifonweoigndreihonrklfanelkgfawgbwetgjbkjgbwegbjkdgbjqkgbkjtbjdbflawnrlkergnkv
							sewjgjvbnarjbdjlsbrfejvbjskfbobnvbiowegjiodsfgsgfgrgrehfgasegFgahrtgdfgddghthgnbxdgnfhdthgnzdrhxtnsrxdhrthjthseythxdyhet
						</p>
					</DetailTextBox>
					<button onClick={moveToChatHandler}>문의하기</button>
				</div>
			</NewFamilyDetailContainer>
			{$isPc && <NewFamilySwiper />}
		</div>
	);
};

export default NewFamilyDetail;
