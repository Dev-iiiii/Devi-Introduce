// 각 섹션의 범위와 중앙 좌표를 계산하는 함수
function calculateSectionCenters() {
  const sections = {
    playlist: document.getElementById('playlist'),
    addlist: document.getElementById('addlist'),
    contact: document.getElementById('contact'),
    project: document.getElementById('project'),
    about: document.getElementById('about'),
    somewhere: document.getElementById('somewhere'),
    home: document.getElementById('home')
  };

  const navHeight = document.querySelector('.navbar').offsetHeight;
  const windowHeight = window.innerHeight;

  // 각 섹션의 범위와 중앙점 계산
  const sectionPositions = {};
  
  for (let id in sections) {
    const section = sections[id];
    if (section) {
      const rect = section.getBoundingClientRect();
      const scrollTop = window.pageYOffset;
      const sectionTop = rect.top + scrollTop;
      const sectionHeight = rect.height;
      
      sectionPositions[id] = {
        top: sectionTop,
        bottom: sectionTop + sectionHeight,
        center: sectionTop + (sectionHeight / 2) - (windowHeight / 2),
        height: sectionHeight
      };
    }
  }

  return sectionPositions;
}

// 네비게이션 클릭 이벤트 수정
document.querySelectorAll('.navbar a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const sectionPositions = calculateSectionCenters();
    
    if (targetId === 'home') {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
      return;
    }
    
    if (targetId === 'playlist') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    if (sectionPositions[targetId]) {
      window.scrollTo({
        top: sectionPositions[targetId].center,
        behavior: 'smooth'
      });
    }
  });
});

// 스크롤 시 현재 섹션 확인 (선택사항)
window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;
  const sectionPositions = calculateSectionCenters();
  
  for (let id in sectionPositions) {
    const section = sectionPositions[id];
    if (scrollPosition >= section.top && scrollPosition < section.bottom) {
      // 현재 섹션 표시 (필요한 경우)
      console.log('Current section:', id);
    }
  }
});
// Smooth background color transition across the entire page
const sections = document.querySelectorAll("section");
const colors = [
  { r: 180, g: 225, b: 235 },  // 가장 밝은 색 (약간 어둡게 조정)
  { r: 130, g: 200, b: 220 },  // 두 번째 색상
  { r: 0, g: 160, b: 200 },    // 중간 색상
  { r: 10, g: 140, b: 190 },   // 중하단 색상
  { r: 5, g: 80, b: 140 },     // 하단 색상 (약간 밝게)
  { r: 2, g: 40, b: 80 }       // 가장 어두운 색 (약간 밝게)
];

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const totalHeight = document.body.scrollHeight - window.innerHeight;

  // Calculate overall scroll ratio (0 ~ 1)
  const scrollRatio = scrollTop / totalHeight;

  // Determine the current and next color indices based on the scroll ratio
  const colorIndex = Math.min(
    Math.floor(scrollRatio * (colors.length - 1)),
    colors.length - 2
  );

  const factor = (scrollRatio * (colors.length - 1)) % 1;

  // Blend the colors
  const r = Math.round(colors[colorIndex].r + (colors[colorIndex + 1].r - colors[colorIndex].r) * factor);
  const g = Math.round(colors[colorIndex].g + (colors[colorIndex + 1].g - colors[colorIndex].g) * factor);
  const b = Math.round(colors[colorIndex].b + (colors[colorIndex + 1].b - colors[colorIndex].b) * factor);

  // Apply blended background color
  document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});
// 페이지 로드 시 맨 아래로 스크롤
window.addEventListener('load', () => {
  const homeSection = document.getElementById('home');
  homeSection.scrollIntoView({ behavior: 'smooth' });
});

// Typing effect for the Home section
const txtTitle = document.querySelector('.txt-title');
const content = "안녕하세요 :)\n서버 개발자가 되고 싶은 \n 9조 전영준입니다.\n 만나서 반갑습니다!!";
let contentIndex = 0;

const typing = () => {
  if (contentIndex < content.length) {
    txtTitle.innerHTML += content[contentIndex] === '\n' ? '<br>' : content[contentIndex];
    contentIndex++;
  } else {
    txtTitle.innerHTML = '';
    contentIndex = 0;
  }
};

setInterval(typing, 250);


// 모달
const modalOpenButton = document.getElementById('modalOpenButton');
const modalCloseButton = document.getElementById('modalCloseButton');
const modal = document.getElementById('modalContainer');

modalOpenButton.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

modalCloseButton.addEventListener('click', () => {
  modal.classList.add('hidden');
});