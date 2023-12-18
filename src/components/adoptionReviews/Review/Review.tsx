import { useState } from 'react';
import {
	DetailImageBox,
	DetailTextBox,
	MoreDropdown,
	NewFamilyDetailContainer,
	UserThumbnail,
} from '../../newFamily/NewFamily.style';
import { RiMore2Line } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { ReviewTextBox } from '../Reviews.style';
import ReviewCommentBox from './ReviewCommentBox';
import { useResponsive } from '../../../hooks/useResponsive';

const Review = () => {
	const location = useLocation();
	const imageUrl = location.state?.imageUrl || '';
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const { $isMobile, $isTablet, $isPc, $isMaxWidth } = useResponsive();

	const toggleDropdown = () => {
		setIsDropdownVisible((prev) => !prev);
	};

	const getMoreBtnSize = () => {
		if ($isMobile) return 20;
		if ($isTablet) return 30;
		if ($isPc) return 30;
	};

	return (
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
					color="var(--color-light-salmon)"
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
			</DetailImageBox>
			<ReviewTextBox>
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
					<p>입양 시기: </p>
					<p>
						ㄹㄹ퓸ㅈ혀ㅠㅕ냥퓬여ㅑ휻쟈ㅕ퓨녀ㅑㅁ로ㅠ뎌흎현ㄷ휴렮나ㅓㅠㄹㄷ혀ㅠ펴ㅑㄴㅇ륲쟈ㅕ듀퍄ㅕㄴㅇ휴혀ㅑㅠㅍ겨ㅑ휴ㅏㅓㅕㅇㄴ휴다륭너ㅏ호ㅜㅏㅣㅜ가ㅜ현륜역륟하ㅓㅠㅜㅇㄹ하ㅠㅈㄷ햐ㅑㄴㅇ휴ㅕㄷㅈ휴녀아휴뎌ㅑㅏ휸야ㅕ슞뎌햐ㅠㄹㅇ하ㅓ쥭가휴재ㅗㅠㅕㅓ뉴셔훔ㅈ휺ㅁ
						며쟈휴 냐ㅕㅁ휴ㅕㄴ윺ㄴ휴ㅑㄴ여ㅠ해ㅕㄴ유푸 ㅑㅕㅈㄱ휴
						녀ㅉ햐개ㅕㅑㄴㅁㄲㅎㅍ녀ㅑ뮤퍄ㅕㅋㄹ유햐ㅕㅈㄷ귷녀댱휴 녀ㅑㅇㅎㅍ
						휴ㅕㅑㄴ휴 ㅈㄱ며ㅠㅑㅎ녀ㅑㅎ
						멷ㅈㄱ휴냐ㅕ휴ㅕㅈ댜휴ㅕㅑㄹㄹ퓸ㅈ혀ㅠㅕ냥퓬여ㅑ휻쟈ㅕ퓨
					</p>
				</DetailTextBox>
				<ReviewCommentBox />
			</ReviewTextBox>
		</NewFamilyDetailContainer>
	);
};

export default Review;
