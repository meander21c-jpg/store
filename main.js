// 매장 관리 시스템 메인 자바스크립트
document.addEventListener('DOMContentLoaded', function() {
    // 애니메이션 초기화
    initializeAnimations();
    
    // 차트 초기화
    initializeCharts();
    
    // 실시간 데이터 업데이트
    startRealTimeUpdates();
    
    // 상호작용 이벤트 설정
    setupInteractions();
});

// 애니메이션 초기화
function initializeAnimations() {
    // 카드 호버 애니메이션
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // 페이지 로드 애니메이션
    anime({
        targets: '.animate-fade-in',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: anime.stagger(100),
        easing: 'easeOutQuad'
    });
}

// 차트 초기화
function initializeCharts() {
    // 매출 차트
    const salesChart = echarts.init(document.getElementById('salesChart'));
    const salesOption = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: '#e5e7eb',
            textStyle: { color: '#374151' }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['월', '화', '수', '목', '금', '토', '일'],
            axisLine: { lineStyle: { color: '#e5e7eb' } },
            axisTick: { show: false },
            axisLabel: { color: '#6b7280' }
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: '#6b7280' },
            splitLine: { lineStyle: { color: '#f3f4f6' } }
        },
        series: [{
            data: [320000, 450000, 380000, 520000, 480000, 650000, 590000],
            type: 'line',
            smooth: true,
            lineStyle: { color: '#3b82f6', width: 3 },
            itemStyle: { color: '#3b82f6' },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
                        { offset: 1, color: 'rgba(59, 130, 246, 0.05)' }
                    ]
                }
            }
        }]
    };
    salesChart.setOption(salesOption);

    // 재고 차트
    const inventoryChart = echarts.init(document.getElementById('inventoryChart'));
    const inventoryOption = {
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: '#e5e7eb',
            textStyle: { color: '#374151' }
        },
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            data: [
                { value: 45, name: '전자제품', itemStyle: { color: '#3b82f6' } },
                { value: 25, name: '의류', itemStyle: { color: '#10b981' } },
                { value: 15, name: '액세서리', itemStyle: { color: '#f59e0b' } },
                { value: 10, name: '기타', itemStyle: { color: '#6b7280' } },
                { value: 5, name: '낮은 재고', itemStyle: { color: '#ef4444' } }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label: {
                fontSize: 12,
                color: '#374151'
            }
        }]
    };
    inventoryChart.setOption(inventoryOption);

    // 반응형 차트
    window.addEventListener('resize', () => {
        salesChart.resize();
        inventoryChart.resize();
    });
}

// 실시간 데이터 업데이트
function startRealTimeUpdates() {
    // 매출 데이터 업데이트 (30초마다)
    setInterval(() => {
        updateSalesMetrics();
    }, 30000);

    // 재고 상태 업데이트 (60초마다)
    setInterval(() => {
        updateInventoryStatus();
    }, 60000);

    // 활동 피드 업데이트 (2분마다)
    setInterval(() => {
        updateActivityFeed();
    }, 120000);
}

// 매출 지표 업데이트
function updateSalesMetrics() {
    const salesElements = document.querySelectorAll('.text-2xl.font-bold.text-gray-900');
    salesElements.forEach(element => {
        if (element.textContent.includes('₩')) {
            // 현재 값에서 랜덤 증가/감소
            const currentValue = parseInt(element.textContent.replace(/[₩,]/g, ''));
            const change = Math.floor(Math.random() * 50000) - 25000;
            const newValue = Math.max(0, currentValue + change);
            
            anime({
                targets: element,
                innerHTML: [element.textContent, `₩${newValue.toLocaleString()}`],
                duration: 1000,
                round: 1,
                easing: 'easeInOutQuad'
            });
        }
    });
}

// 재고 상태 업데이트
function updateInventoryStatus() {
    const inventoryCount = document.querySelector('.text-2xl.font-bold.text-gray-900');
    if (inventoryCount && inventoryCount.textContent === '1,247') {
        const newCount = 1247 + Math.floor(Math.random() * 20) - 10;
        anime({
            targets: inventoryCount,
            innerHTML: [inventoryCount.textContent, newCount.toLocaleString()],
            duration: 800,
            round: 1,
            easing: 'easeInOutQuad'
        });
    }
}

// 활동 피드 업데이트
function updateActivityFeed() {
    const activities = [
        {
            icon: 'green',
            title: '새 주문 접수 #12346',
            description: '이영희님이 ₩32,000 주문을 완료했습니다.',
            time: '방금 전'
        },
        {
            icon: 'blue',
            title: '재고 업데이트',
            description: '블루투스 스피커 재고가 12개에서 7개로 업데이트되었습니다.',
            time: '방금 전'
        },
        {
            icon: 'purple',
            title: '고객 문의',
            description: '새로운 고객 문의가 접수되었습니다.',
            time: '1분 전'
        }
    ];

    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    addNewActivity(randomActivity);
}

// 새 활동 추가
function addNewActivity(activity) {
    const activityFeed = document.querySelector('.space-y-4');
    const newActivity = document.createElement('div');
    newActivity.className = 'flex items-start space-x-3 opacity-0';
    newActivity.innerHTML = `
        <div class="w-8 h-8 bg-${activity.icon}-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <svg class="w-4 h-4 text-${activity.icon}-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
        </div>
        <div class="flex-1">
            <p class="text-sm font-medium text-gray-900">${activity.title}</p>
            <p class="text-sm text-gray-600">${activity.description}</p>
            <p class="text-xs text-gray-500 mt-1">${activity.time}</p>
        </div>
    `;

    activityFeed.insertBefore(newActivity, activityFeed.firstChild);

    // 애니메이션으로 나타나기
    anime({
        targets: newActivity,
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 500,
        easing: 'easeOutQuad'
    });

    // 오래된 활동 제거 (5개 이상일 경우)
    const activities = activityFeed.children;
    if (activities.length > 5) {
        anime({
            targets: activities[activities.length - 1],
            opacity: [1, 0],
            translateY: [0, -20],
            duration: 300,
            complete: () => {
                if (activities[activities.length - 1]) {
                    activities[activities.length - 1].remove();
                }
            }
        });
    }
}

// 상호작용 이벤트 설정
function setupInteractions() {
    // 빠른 액션 버튼들
    const quickActionButtons = document.querySelectorAll('.space-y-3 button');
    quickActionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = button.querySelector('.font-medium').textContent;
            handleQuickAction(buttonText);
        });
    });

    // 네비게이션 링크
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') !== 'index.html') {
                e.preventDefault();
                showComingSoon(link.textContent);
            }
        });
    });

    // 보고서 생성 버튼
    const reportButton = document.querySelector('button:contains("보고서 생성")');
    if (reportButton) {
        reportButton.addEventListener('click', () => {
            generateReport();
        });
    }
}

// 빠른 액션 처리
function handleQuickAction(actionName) {
    showNotification(`${actionName} 기능이 곧 제공됩니다!`, 'info');
}

// 알림 표시
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300`;
    
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    notification.classList.add(bgColor);
    
    notification.innerHTML = `
        <div class="flex items-center">
            <svg class="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-white font-medium">${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // 슬라이드 인 애니메이션
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // 자동 제거
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 준비 중인 기능 표시
function showComingSoon(featureName) {
    showNotification(`${featureName} 페이지는 준비 중입니다!`, 'info');
}

// 보고서 생성
function generateReport() {
    showNotification('보고서 생성 중...', 'info');
    
    // 시뮬레이션을 위한 로딩
    setTimeout(() => {
        showNotification('보고서가 성공적으로 생성되었습니다!', 'success');
    }, 2000);
}

// 유틸리티 함수들
function formatCurrency(amount) {
    return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}