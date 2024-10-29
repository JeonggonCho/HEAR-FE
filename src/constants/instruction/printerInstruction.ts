export const printerInstruction = {
    introduction: {
        machine: {
            ko: "1. 3D 프린터 기기",
            en: "1. 3D Printer Machine",
            ch: "1. 3D打印机设备",
        },
        name: {
            ko: "모델명",
            en: "Model Name",
            ch: "型号",
        },
        size: {
            ko: "작업대 사이즈",
            en: "Worktable Size",
            ch: "工作台尺寸",
        },
        material: {
            ko: "재료",
            en: "Material",
            ch: "材料",
        },
        filament: {
            ko: "PLA 필라멘트 추천",
            en: "PLA filament recommended",
            ch: "推荐使用PLA耗材",
        },
        extension: {
            ko: "확장자",
            en: "File Extension",
            ch: "文件扩展名",
        },
        recommendedExtension: {
            ko: "STL(추천), OBJ → GCODE 변환",
            en: "STL (recommended), OBJ → GCODE conversion",
            ch: "STL（推荐）、OBJ → GCODE 转换",
        },
        software: {
            ko: "GCODE 변환 소프트웨어",
            en: "GCODE Conversion Software",
            ch: "GCODE转换软件",
        },
        goToLink: {
            ko: "홈페이지 이동",
            en: "Go to Link",
            ch: "访问链接",
        },
        rule: {
            ko: "2. 규칙",
            en: "2. Rules",
            ch: "2. 规则",
        },
        usageTime: {
            ko: "사용시간",
            en: "Usage Time",
            ch: "使用时间",
        },
        schedule: {
            ko: "하루 : 10시 - 18시 (8시간)",
            en: "Daily: 10 AM - 6 PM (8 hours)",
            ch: "每日：10点 - 18点（8小时）",
        },
        weekend: {
            ko: "* 기본적으로 주말 이용이 불가능하며 상황에 따라 탄력 운영",
            en: "* Generally, weekend use is not available, and flexible operation may be applied depending on the situation",
            ch: "* 基本上，周末无法使用，具体情况可以灵活安排",
        },
        countOfUser: {
            ko: "예약 인원",
            en: "Number of Reservations",
            ch: "预约人数",
        },
        manPerMachine: {
            ko: "하루 : 기기 1대당 1명 씩",
            en: "Daily: 1 person per machine",
            ch: "每日：每台设备1人",
        },
        keyCard: {
            ko: "카드키",
            en: "Key Card",
            ch: "门禁卡",
        },
        idCard: {
            ko: "학생증을 맡겨야 카드키를 받아갈 수 있음",
            en: "You must leave your student ID to receive the key card",
            ch: "必须交学生证才能领取门禁卡",
        },
        warning: {
            ko: "규칙 미준수 시",
            en: "In case of rule violation",
            ch: "如违反规则",
        },
        warningContent: {
            ko: "회당 경고 1회",
            en: "One warning per occurrence",
            ch: "每次发生一次警告",
        },
    },
    preparation: {
        modeling: {
            ko: "1. 모델링",
            en: "1. Modeling",
            ch: "1. 建模",
        },
        worktable: {
            ko: "1-1. 작업대 사이즈에 맞추어 모델링하기",
            en: "1-1. Model according to the worktable size",
            ch: "1-1. 根据工作台尺寸建模",
        },
        save: {
            ko: "1-2. \"STL\" 확장자로 저장하기",
            en: "1-2. Save as \"STL\" extension",
            ch: "1-2. 以\"STL\"扩展名保存",
        },
        conversion: {
            ko: "2. 파일 변환",
            en: "2. File Conversion",
            ch: "2. 文件转换",
        },
        activateProgram: {
            ko: "2-1. Cubicreator 프로그램을 실행하고 기기 설정 [3DP-310F]",
            en: "2-1. Run the Cubicreator program and set up the device [3DP-310F]",
            ch: "2-1. 运行Cubicreator程序并设置设备[3DP-310F]",
        },
        importFile: {
            ko: "2-2. Cubicreator 프로그램으로 STL 파일 가져오기",
            en: "2-2. Import the STL file into the Cubicreator program",
            ch: "2-2. 将STL文件导入Cubicreator程序",
        },
        selectMaterial: {
            ko: "2-3. 메뉴에서 \"출력옵션\" 클릭 및 필라멘트를 \"PLA\"로 설정",
            en: "2-3. Click on \"Print Options\" in the menu and set the filament to \"PLA\"",
            ch: "2-3. 在菜单中点击“打印选项”，并将耗材设置为\"PLA\"",
        },
        ready: {
            ko: "2-4. 메뉴에서 \"출력준비\" 클릭",
            en: "2-4. Click on \"Prepare for Printing\" in the menu",
            ch: "2-4. 在菜单中点击\"准备打印\"",
        },
        checkTime: {
            ko: "* 좌측 모델정보창에서 출력예상시간 확인 가능",
            en: "* The estimated print time can be checked in the model information window on the left",
            ch: "* 可以在左侧模型信息窗口中查看预计打印时间",
        },
        saveGCode: {
            ko: "2-5. 출력옵션 및 준비가 완료되면 메뉴에서 \"GCODE 저장\" 클릭",
            en: "2-5. Once the print options and preparation are complete, click \"Save GCODE\" in the menu",
            ch: "2-5. 输出选项和准备完成后，在菜单中点击\"保存GCODE\"",
        },
        checkSetting: {
            ko: "* 여기서도 출력예상시간 및 사용될 재료량 확인 가능",
            en: "* The estimated print time and the amount of material to be used can also be checked here",
            ch: "* 这里也可以查看预计打印时间和将使用的材料量",
        },
        assistantCheck: {
            ko: "3. 조교 확인",
            en: "3. Confirm with the assistant",
            ch: "3. 与助教确认",
        },
        usb: {
            ko: "3-1. USB에 파일담기",
            en: "3-1. Transfer the files to the USB",
            ch: "3-1. 将文件传输到USB",
        },
        usbFormat: {
            ko: "* USB는 FAT32 포맷의 USB 사용",
            en: "* Use a USB formatted in FAT32",
            ch: "* 使用FAT32格式的USB",
        },
        visitAssistant: {
            ko: "3-2. 프린팅 전 STL 파일과 GCODE 파일을 가지고 조교 방문",
            en: "3-2. Visit the assistant with the STL file and GCODE file before printing",
            ch: "3-2. 打印前携带STL文件和GCODE文件去找助教",
        },
        call: {
            ko: "* 방문 전 미리 예약 및 연락 필요",
            en: "* Please make a reservation and contact before visiting",
            ch: "* 访问前请提前预约并联系",
        },
        approvalAssistant: {
            ko: "* 조교가 형태와 크기, 효율성을 판단하여 사용 여부 결정",
            en: "* The assistant will determine whether to use it based on the shape, size, and efficiency",
            ch: "* 助教将根据形状、大小和效率来决定是否使用",
        },
    },
    usage: {
        method: {
            ko: "3D 프린터 사용법",
            en: "How to use the 3D printer",
            ch: "3D打印机使用方法",
        },
        turnOn: {
            ko: "1. 전원 켜기",
            en: "1. Turn on the power",
            ch: "1. 打开电源",
        },
        selectTemperature: {
            ko: "2. 메뉴에서 \"온도\" 클릭",
            en: "2. Click on \"Temperature\" in the menu",
            ch: "2. 在菜单中点击\"温度\"",
        },
        selectMaterial: {
            ko: "3. 사용할 재료 클릭 [PLA]",
            en: "3. Click on the material to be used [PLA]",
            ch: "3. 点击要使用的材料 [PLA]",
        },
        settingTemperature: {
            ko: "4. 재료 선택 시, 선택한 재료에 적합한 온도로 설정됨",
            en: "4. When a material is selected, it is set to the appropriate temperature for that material",
            ch: "4. 选择材料时，将设置为该材料的适当温度",
        },
        linkUsb: {
            ko: "5. 파일 복사를 위해 기기 상단에 USB 결합",
            en: "5. Connect the USB to the top of the device for file copying",
            ch: "5. 为了复制文件，将USB连接到设备顶部",
        },
        usbFormat: {
            ko: "* USB는 FAT32 포맷의 USB 사용",
            en: "* Use a USB formatted in FAT32",
            ch: "* 使用FAT32格式的USB",
        },
        usbIcon: {
            ko: "* 기기에서 USB를 올바르게 인식할 경우, 기기 화면에 USB 아이콘이 표시됨",
            en: "* If the device recognizes the USB correctly, a USB icon will appear on the device screen",
            ch: "* 如果设备正确识别USB，则设备屏幕上将显示USB图标",
        },
        copyMethod1: {
            ko: "6. [파일 복사 방법1]",
            en: "6. [File Copy Method 1]",
            ch: "6. [文件复制方法1]",
        },
        copyMethod1Sequence: {
            ko: "메뉴 → 유틸리티 → 파일관리자 → 외부메모리 → 파일찾기 → 복사 → 시작",
            en: "Menu → Utilities → File Manager → External Memory → Find File → Copy → Start",
            ch: "菜单 → 实用工具 → 文件管理器 → 外部存储 → 查找文件 → 复制 → 开始",
        },
        copyMethod2: {
            ko: "7. [파일 복사 방법2]",
            en: "7. [File Copy Method 2]",
            ch: "7. [文件复制方法2]",
        },
        copyMethod2Sequence: {
            ko: "메뉴 → 출력 → 파일 → 외부메모리 → 파일찾기 → 시작",
            en: "Menu → Print → File → External Memory → Find File → Start",
            ch: "菜单 → 打印 → 文件 → 外部存储 → 查找文件 → 开始",
        },
        removeUsb: {
            ko: "8. 시작하면 USB 제거해도 됨",
            en: "8. You can remove the USB once it starts",
            ch: "8. 开始后可以拔掉USB",
        },
        autoLeveling: {
            ko: "9. 오토 레벨링이 자동으로 진행됨",
            en: "9. Auto leveling will be performed automatically",
            ch: "9. 自动水平调整将自动进行",
        },
        defAutoLeveling: {
            ko: "* 오토 레벨링: 완벽한 프린팅을 위해 수평을 맞추는 과정",
            en: "* Auto leveling: The process of adjusting the level for perfect printing",
            ch: "* 自动水平调整：为完美打印而调整水平的过程",
        },
        autoLevelingTime: {
            ko: "* 짧게는 몇 초에서 길게는 1~2분 걸릴 수 있음",
            en: "* It can take anywhere from a few seconds to 1-2 minutes",
            ch: "* 可能需要从几秒钟到1~2分钟不等",
        },
        failAutoLeveling: {
            ko: "10. 오토 레벨링이 실패할 경우, 청소 도구를 이용해 청소하기",
            en: "10. If auto leveling fails, clean using cleaning tools",
            ch: "10. 如果自动水平调整失败，请使用清洁工具进行清洁",
        },
        toolWarning: {
            ko: "* 도구 분실 시, 경고 1회 및 배상",
            en: "* In case of lost tools, one warning will be issued and compensation will be required",
            ch: "* 如果工具丢失，将发出一次警告并要求赔偿",
        },
        removeFilament: {
            ko: "* 노즐 주변에 묻어있는 필라멘트 제거",
            en: "* Remove any filament residue around the nozzle",
            ch: "* 清除喷嘴周围的任何塑料丝残留物",
        },
        cleaningWorktable: {
            ko: "* 베드의 3축 측정 부위에 묻어있는 이물질 제거",
            en: "* Remove any foreign substances from the 3-axis measurement area of the bed",
            ch: "* 清除床的三轴测量区域上的任何异物",
        },
        warningSharp: {
            ko: "* 절대로 날카로운 물건으로 긁지 않기",
            en: "* Never scratch with sharp objects",
            ch: "* 切勿使用尖锐物品刮擦",
        },
        reAutoLeveling: {
            ko: "11. 청소 완료 후, 다시 오토 레벨링 및 프린팅 진행",
            en: "11. After cleaning, proceed with auto leveling and printing again",
            ch: "11. 清洁完成后，重新进行自动水平调整和打印",
        },
        detachResult: {
            ko: "12. 프린팅이 완료되면 온도가 떨어진 후, 베드에서 결과물 제거하기",
            en: "12. After printing is complete, remove the result from the bed once the temperature has cooled down",
            ch: "12. 打印完成后，待温度下降后，从打印平台上移除成品",
        },
        warningBurn: {
            ko: "* 고온의 베드에 접촉 시, 화상의 위험이 있음",
            en: "* There is a risk of burns when coming into contact with the hot bed",
            ch: "* 与高温打印平台接触时有烫伤的风险",
        },
        warningDetach: {
            ko: "* 온도가 아직 높은 경우, 베드에서 결과물이 잘 안 떨어질 수 있음",
            en: "* If the temperature is still high, the result may not come off the bed easily",
            ch: "* 如果温度仍然很高，成品可能不容易从打印平台上脱落",
        },
        warningShrink: {
            ko: "* 온도를 급격히 낮출 경우, 결과물의 수축이 발생할 수 있음",
            en: "* Rapidly lowering the temperature may cause the result to shrink",
            ch: "* 急剧降低温度可能会导致成品收缩",
        },
    },
    after: {
        afterUsage: {
            ko: "3D 프린터 사용 이후",
            en: "After using the 3D printer",
            ch: "使用3D打印机后",
        },
        turnOff: {
            ko: "1. 전원 끄기",
            en: "1. Turn off the power",
            ch: "1. 关闭电源",
        },
        cleaning: {
            ko: "2. 청소 및 정리하기",
            en: "2. Clean and organize",
            ch: "2. 清理和整理",
        },
        warningCleaning: {
            ko: "* 청소 미실시 후, 적발 시 경고 1회",
            en: "* One warning will be issued if cleaning is not performed",
            ch: "* 如果未进行清洁，发现后将给予一次警告",
        },
    },
};