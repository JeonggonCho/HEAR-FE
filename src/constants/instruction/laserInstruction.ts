export const laserInstruction = {
    introduction: {
        laserMachine: {
            ko: "1. 레이저 커팅기 기기",
            en: "1. Laser Cutting Machine",
            ch: "1. 激光切割机",
        },
        modelName: {
            ko: "모델명",
            en: "Model Name",
            ch: "型号",
        },
        size: {
            ko: "작업 범위",
            en: "Working Area",
            ch: "工作范围",
        },
        extension: {
            ko: "파일 확장자",
            en: "File Extension",
            ch: "文件扩展名",
        },
        validMaterial: {
            ko: "사용 가능 재료",
            en: "Available Materials",
            ch: "可用材料",
        },
        paper: {
            ko: "- 종이 : 두께 0.5T 이상",
            en: "- Paper: Thickness 0.5T or more",
            ch: "- 纸张：厚度0.5T以上",
        },
        tree: {
            ko: "- 나무 : 두께 3T 이하의 발사, 배스우드와 같은 원목",
            en: "- Wood: Solid woods like Balsa or Basswood with a thickness of 3T or less",
            ch: "- 木材：厚度3T以下的轻木、椴木等实木",
        },
        pvc: {
            ko: "- 아크릴 : 두께 5T 이하",
            en: "- Acrylic: Thickness of 5T or less",
            ch: "- 亚克力：厚度5T以下",
        },
        invalidMaterial: {
            ko: "사용 금지 재료",
            en: "Prohibited Materials",
            ch: "禁止使用的材料",
        },
        burningMaterials: {
            ko: "- 가연성 : 우드락, 포맥스 등",
            en: "- Flammable materials: foam board, PVC foam sheet, etc.",
            ch: "- 易燃材料: 泡沫板, PVC泡沫板等",
        },
        harmfulMaterials: {
            ko: "- 유해성 : MDF (접착가공목재) 등",
            en: "- Harmful materials: MDF (Medium Density Fiberboard) and similar materials",
            ch: "- 有害材料: 中密度纤维板(MDF)等",
        },
        materialWarning: {
            ko: "* 해당 재료 사용 시, 모형제작실 사용 금지",
            en: "* Use of these materials will result in a ban from the model-making studio",
            ch: "* 使用这些材料将被禁止使用模型制作室",
        },
        countOfMachine: {
            ko: "운용 기기 대수",
            en: "Number of Operating Machines",
            ch: "操作设备数量",
        },
        twoMachines: {
            ko: "2대",
            en: "2 units",
            ch: "2台",
        },
        rule: {
            ko: "2. 규칙",
            en: "2. Rules",
            ch: "2. 规则",
        },
        countOfReservation: {
            ko: "예약 가능 시간 및 횟수",
            en: "Available reservation time and number of times",
            ch: "可预约时间和次数",
        },
        timePerOnce: {
            ko: "1회 신청에 1시간 사용",
            en: "1 hour of use per application",
            ch: "每次申请使用1小时",
        },
        countPerDay: {
            ko: "1일 최대 2회",
            en: "Up to 2 times a day",
            ch: "一天最多2次",
        },
        countPerWeek: {
            ko: "1주일 최대 4회까지 예약 가능",
            en: "Up to 4 reservations are allowed per week",
            ch: "每周最多可以预订4次",
        },
        operatingTime: {
            ko: "운영 시간",
            en: "Operating Hours",
            ch: "运营时间",
        },
        extendOperatingTime: {
            ko: "* 시험기간 연장 사용신청은 해당 학년 과대표가 의견을 취합해서 전달 후, 조교 판단 하에 결정",
            en: "* Requests for extended usage during exam periods must be compiled by the class representative of the respective year and submitted for the assistant's decision.",
            ch: "* 考试期间的延长使用申请由各年级的班代表汇总意见后提交，由助教决定。",
        },
        reservationTime: {
            ko: "예약 시간",
            en: "Reservation Time",
            ch: "预约时间",
        },
        beforeOneDay: {
            ko: "이용 전날 예약 가능",
            en: "Reservation Available the Day Before Use",
            ch: "可以在使用前一天预约",
        },
        warningList: {
            ko: "경고 사항",
            en: "Warning Information",
            ch: "警告事项",
        },
        warning1: {
            ko: "- 예약자 외의 타인 사용 불가",
            en: "- No one other than the reserving person may use it",
            ch: "- 除预约者外，其他人不得使用",
        },
        warning2: {
            ko: "- 사용 중 자리비움 금지",
            en: "- No leaving your seat while in use",
            ch: "- 使用中禁止离开座位",
        },
        warning3: {
            ko: "- 사용이 끝나면 카드키를 조교에게 직접 반납해야하며 다음 이용자에게 전달 금지",
            en: "- At the end of the usage, the card key must be returned directly to the assistant, and it is prohibited to pass it to the next user.",
            ch: "- 使用结束后，必须将卡钥匙直接归还给助教，禁止转交给下一个用户。",
        },
        breakRule: {
            ko: "규칙 미준수 시",
            en: "In case of rule violation",
            ch: "违反规则时",
        },
        breakRuleDescription: {
            ko: "회당 경고 1회",
            en: "One warning per instance",
            ch: "每次警告一次",
        },
    },
    preparation: {
        usageCad: {
            ko: "1. 캐드를 이용하는 경우",
            en: "1. When using CAD",
            ch: "1. 使用CAD的情况",
        },
        cadWork: {
            ko: "1-1. 캐드에서 원하는 스케일로 레이저 커팅 도면 작업하기",
            en: "1-1. Creating a laser cutting drawing in CAD with the desired scale",
            ch: "1-1. 在CAD中按所需比例制作激光切割图纸",
        },
        origin: {
            ko: "* 도면 객체를 원점(0,0)에 가까이 위치시켜야 함",
            en: "* The drawing objects should be positioned close to the origin (0,0)",
            ch: "* 图纸对象应靠近原点 (0,0) 放置",
        },
        cadLayer: {
            ko: "1-2. 레이저 커팅기 소프트웨어 LaserCut은 색상으로 레이어를 구분하기에 자르는 레이어(cut)와 해치, 각인 레이어(engrave)를 분리하고 레이어 색상을 다르게 적용하기",
            en: "1-2. In the LaserCut software for laser cutters, separate the cutting layer (cut) from the hatching and engraving layers (engrave) and apply different colors to each layer for distinction",
            ch: "1-2. 激光切割机软件LaserCut通过颜色区分图层，因此需将切割图层（cut）与剖面线和雕刻图层（engrave）分开，并为每个图层应用不同的颜色",
        },
        cadSave: {
            ko: "1-3. 메뉴 → 다른이름으로 저장 → 확장자를 dxf로 선택하여 저장",
            en: "1-3. Menu → Save As → Select file type as DXF and save",
            ch: "1-3. 菜单 → 另存为 → 选择DXF格式保存",
        },
        usageRhino: {
            ko: "2. Rhino를 이용하는 경우",
            en: "2. When using Rhino",
            ch: "2. 使用Rhino的情况",
        },
        rhinoWork: {
            ko: "1-1. Rhino Top 뷰에서 원하는 스케일로 레이저 커팅 도면 작업하기",
            en: "1-1. Creating a laser cutting drawing in Rhino's Top view at the desired scale",
            ch: "1-1. 在Rhino的顶部视图中按所需比例制作激光切割图纸",
        },
        rhinoLayer: {
            ko: "1-2. 레이저 커팅기 소프트웨어 LaserCut은 색상으로 레이어를 구분하기에 자르는 레이어(cut)와 해치, 각인 레이어(engrave)를 분리하고 레이어 색상을 다르게 적용하기",
            en: "1-2. The laser cutting software LaserCut differentiates layers by color, so separate the cutting layer (cut) from the hatch and engraving layers (engrave) and apply different colors to each layer",
            ch: "1-2. 激光切割软件LaserCut通过颜色区分图层，因此需要将切割图层（cut）与填充和雕刻图层（engrave）分开，并为每个图层应用不同的颜色",
        },
        rhinoSave: {
            ko: "1-3. 객체 선택 → export → 확장자를 dxf로 선택하여 저장",
            en: "1-3. Select the object → Export → Choose DXF as the file type and save",
            ch: "1-3. 选择对象 → 导出 → 选择DXF格式并保存",
        },
    },
    usage: {
        laserCutterUsage: {
            ko: "레이저 커팅기 사용법",
            en: "How to use the laser cutter",
            ch: "激光切割机使用方法",
        },
        fanOn: {
            ko: "1. 왼쪽 벽면의 환풍기(FAN) 켜기",
            en: "1. Turn on the fan on the left wall",
            ch: "1. 打开左侧墙壁上的风扇",
        },
        laserOn: {
            ko: "2. 전원 켜기",
            en: "2. Turn on the power",
            ch: "2. 打开电源",
        },
        pushBtn: {
            ko: "* 돌리는 버튼이 아닌 누르는 버튼으로 작동",
            en: "* Operate with a pressing button, not a rotating button",
            ch: "* 使用按压按钮，而不是旋转按钮进行操作",
        },
        activeProgram: {
            ko: "3. 컴퓨터에서 LaserCut 프로그램 실행하기",
            en: "3. Run the LaserCut program on the computer",
            ch: "3. 在计算机上运行LaserCut程序",
        },
        extension: {
            ko: "* 사용가능한 파일은 cad 파일의 dxf 확장자로 변환해야 함",
            en: "* The usable files must be converted to DXF format from CAD files",
            ch: "* 可用的文件必须从CAD文件转换为DXF格式",
        },
        programWindow: {
            ko: "LaserCut 실행화면",
            en: "LaserCut Startup Screen",
            ch: "LaserCut启动屏幕",
        },
        importFile: {
            ko: "4. 파일 불러오기",
            en: "4. Import File",
            ch: "4. 导入文件",
        },
        importSequence: {
            ko: "메뉴 → File → Import",
            en: "Menu → File → Import",
            ch: "菜单 → 文件 → 导入",
        },
        checkFile: {
            ko: "5. 화면에서 불러온 파일을 확인하기",
            en: "5. Verify the imported file on the screen",
            ch: "5. 在屏幕上确认导入的文件",
        },
        selectMode: {
            ko: "6. 좌측상단의 레이어창에서 모드 선택",
            en: "6. Select the mode in the layer window at the top left",
            ch: "6. 在左上角的图层窗口中选择模式",
        },
        modeCategories: {
            ko: "* 모드 종류 : Cut(자르기), Engrave(각인), GradeEngrave(그라데이션 각인)",
            en: "* Mode types: Cut (cutting), Engrave (engraving), GradeEngrave (gradient engraving)",
            ch: "* 模式类型：Cut（切割）、Engrave（雕刻）、GradeEngrave（渐变雕刻）",
        },
        cut: {
            ko: "- 자르기 : 재료를 완전히 절단함",
            en: "- Cutting: Completely cuts through the material",
            ch: "- 切割：完全切断材料",
        },
        engrave: {
            ko: "- 각인 : 일정 강도로 패턴 및 텍스트를 새김",
            en: "- Engraving: Etches patterns and text with a certain intensity",
            ch: "- 雕刻：以一定强度刻画图案和文本",
        },
        gradient: {
            ko: "- 그라데이션 각인 : 강도와 속도를 조절하여 재료 표면에 다양한 깊이와 명암을 표현 (비추천)",
            en: "- Gradient Engraving: Adjusts intensity and speed to express various depths and shades on the material surface (not recommended)",
            ch: "- 渐变雕刻：通过调节强度和速度在材料表面表现不同的深度和明暗（不推荐）",
        },
        color: {
            ko: "* LaserCut 프로그램에서는 레이어를 \"색상\"에 따라서 분류하기에 주의하기",
            en: "* In the LaserCut program, be careful as layers are categorized by \"color\"",
            ch: "* 在LaserCut程序中，请注意图层是按\"颜色\"分类的",
        },
        divideLayer: {
            ko: "* 자르는 레이어와 각인 레이어의 색상을 분류할 필요가 있음",
            en: "* It is necessary to categorize the colors of the cutting layer and engraving layer",
            ch: "* 有必要对切割层和雕刻层的颜色进行分类",
        },
        setting: {
            ko: "7. 레이어창에서 스피드와 파워 설정하기",
            en: "7. Set the speed and power in the layer window",
            ch: "7. 在图层窗口中设置速度和功率",
        },
        ingredient: {
            ko: "* 재료의 종류, 두께에 따라서 자르기 모드임에도 잘리지 않을 수 있고, 각인 모드임에도 잘릴 수 있으므로 테스트가 필요함",
            en: "* Depending on the type and thickness of the material, it may not cut even in cutting mode and may cut even in engraving mode, so testing is necessary",
            ch: "* 根据材料的类型和厚度，即使在切割模式下也可能无法切割，而在雕刻模式下可能会切割，因此需要进行测试",
        },
        options: {
            ko: "* 옵션 종류 : 속도, 세기, 코너 세기",
            en: "* Option types: Speed, Power, Corner Power",
            ch: "* 选项类型：速度、功率、角落功率",
        },
        needTest: {
            ko: "* 옵션 값은 정답이 없으므로 테스트가 필요함",
            en: "* There are no definitive answers for option values, so testing is necessary",
            ch: "* 选项值没有固定的答案，因此需要进行测试",
        },
        download: {
            ko: "8. 설정이 완료되면 아래 \"다운로드\" 클릭",
            en: "8. Once the settings are complete, click \"Download\" below",
            ch: "8. 设置完成后，点击下面的\"下载\"",
        },
        downloadCurrent: {
            ko: "9. \"Download current\" 클릭",
            en: "9. Click \"Download current\"",
            ch: "9. 点击\"下载当前\"",
        },
        resetHistory: {
            ko: "* 만약 이미 다운로드 된 파일이 있으면 \"Del all\"을 클릭하여 다운로드 내역 지우기",
            en: "* If there are already downloaded files, click \"Del all\" to clear the download history",
            ch: "* 如果已经有下载的文件，请点击\"删除所有\"以清除下载记录",
        },
        loading: {
            ko: "로딩 화면",
            en: "Loading Screen",
            ch: "加载屏幕",
        },
        downloadedFile: {
            ko: "다운로드 된 파일",
            en: "Downloaded Files",
            ch: "下载的文件",
        },
        checkMachine: {
            ko: "10. 기기에서 다운로드 된 파일 확인",
            en: "10. Check the downloaded files on the machine",
            ch: "10. 检查机器上下载的文件",
        },
        testBtn: {
            ko: "11. 기기의 \"Test\" 버튼 클릭 시, 작업의 전체 영역 크기를 확인할 수 있음",
            en: "11. By clicking the \"Test\" button on the machine, you can check the total area size of the work",
            ch: "11. 点击机器上的\"测试\"按钮，可以检查工作的整体区域大小",
        },
        readjust: {
            ko: "* 작업 영역이 재료의 크기를 벗어날 경우, 파일을 다시 조정해야 함",
            en: "* If the work area exceeds the size of the material, the file needs to be readjusted",
            ch: "* 如果工作区域超出材料的大小，则需要重新调整文件",
        },
        guide: {
            ko: "12. 재료를 올린 뒤, 레이저 가이드를 활용하여 레이저 높이 조절하기",
            en: "12. After placing the material, use the laser guide to adjust the laser height",
            ch: "12. 放置材料后，使用激光导轨调整激光高度",
        },
        start: {
            ko: "13. 덮개를 닫고 \"Start\" 버튼 누르고 시작하기",
            en: "13. Close the cover and press the \"Start\" button to begin",
            ch: "13. 关闭盖子并按\"开始\"按钮以开始",
        },
        cover: {
            ko: "* 커팅 과정에서 유해물질이 발생할 수 있으므로 반드시 덮개를 닫고 사용하기",
            en: "* Harmful substances may be generated during the cutting process, so always use with the cover closed",
            ch: "* 在切割过程中可能会产生有害物质，因此务必在关闭盖子的情况下使用",
        },
    },
    after: {
        afterUsage: {
            ko: "레이저 커팅기 사용 이후",
            en: "After using the laser cutter",
            ch: "使用激光切割机后",
        },
        turnOff: {
            ko: "1. 전원 끄기",
            en: "1. Turn off the power",
            ch: "1. 关闭电源",
        },
        cleaning: {
            ko: "2. 개인이 사용하고 남은 재료 및 실내 청소하기",
            en: "2. Clean up any leftover materials and tidy the workspace",
            ch: "2. 清理个人使用后剩余的材料和整理室内",
        },
        fanOff: {
            ko: "3. 환풍기(FAN) 끄고 퇴실하기",
            en: "3. Turn off the fan and exit",
            ch: "3. 关闭风扇并退出",
        },
        warning: {
            ko: "* 미실시 후, 적발 시 경고 1회",
            en: "* Failure to comply will result in one warning if caught",
            ch: "* 如未执行，将在被发现时给予一次警告",
        },
    },
};