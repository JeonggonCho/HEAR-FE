export const vacuumInstruction = {
    introduction: {
        vacuumMachine: {
            ko: "1. 사출 성형기 기기",
            en: "1. Vacuum Machine",
            ch: "1. 注塑机",
        },
        modelName: {
            ko: "모델명",
            en: "Model Name",
            ch: "型号",
        },
        heightLimit: {
            ko: "최대 거푸집 높이",
            en: "Maximum Mold Height",
            ch: "最大模具高度",
        },
        validMaterial: {
            ko: "권장 재료",
            en: "Recommended Materials",
            ch: "推荐材料",
        },
        materials: {
            ko: "조작과 성형이 용이한 PVC 필름, 아크릴 (3 ~ 5 mm)를 사용하는 것을 권장",
            en: "It is recommended to use PVC film and acrylic (3 to 5 mm) for easy manipulation and molding.",
            ch: "建议使用便于操作和成型的PVC薄膜和丙烯（3至5毫米）。",
        },
        materialWarning: {
            ko: "* 아크릴 중, 연질 아크릴은 경화되기에 사용하지 않도록 함",
            en: "* Among acrylics, soft acrylic should not be used as it hardens.",
            ch: "* 在丙烯酸中，软丙烯酸不应使用，因为它会硬化。",
        },
        materialSize: {
            ko: "재료 규격",
            en: "Material Specifications",
            ch: "材料规格",
        },
        longSideLength: {
            ko: "- 장변 : 450 ~ 500 mm",
            en: "- Long Side: 450 ~ 500 mm",
            ch: "- 长边: 450 ~ 500 毫米",
        },
        shortSideLength: {
            ko: "- 단변 : 300 ~ 350 mm",
            en: "- Short Side: 300 ~ 350 mm",
            ch: "- 短边: 300 ~ 350 毫米",
        },
        countOfMachine: {
            ko: "운용 기기 대수",
            en: "Number of Operating Machines",
            ch: "操作设备数量",
        },
        oneMachine: {
            ko: "1대",
            en: "1 unit",
            ch: "1台",
        },
    },
    preparation: {
        mold: {
            ko: "거푸집",
            en: "Mold",
            ch: "模具",
        },
        moldDescription: {
            ko: "찍어낼 거푸집 틀이 필요하며, 3D 프린팅을 이용하여 거푸집 모형을 만들 수 있음",
            en: "A mold frame is required for casting, and a mold model can be created using 3D printing.",
            ch: "需要用于铸造的模具框架，并且可以利用3D打印制作模具模型。",
        },
        heightLimit: {
            ko: "* 거푸집의 최대 높이는 약 15cm",
            en: "* The maximum height of the mold is approximately 15cm.",
            ch: "* 模具的最大高度约为15厘米。",
        },
    },
    usage: {
        controllers: {
            ko: "1. 사출 성형기 조작부",
            en: "1. Vacuum Machine Control Panel",
            ch: "1. 注塑机操作面板",
        },
        power: {
            ko: "전원",
            en: "Power",
            ch: "电源",
        },
        heat: {
            ko: "가열판 조작부",
            en: "Heating Plate Control Panel",
            ch: "加热板控制面板",
        },
        pressure: {
            ko: "양/음압 조절부",
            en: "Positive/Negative Pressure Control",
            ch: "正/负压控制",
        },
        timer: {
            ko: "타이머",
            en: "Timer",
            ch: "定时器",
        },
        on: {
            ko: "2. 전원 켜기",
            en: "2. Turn on the power",
            ch: "2. 打开电源",
        },
        onHeating: {
            ko: "3. 가열판 켜기",
            en: "3. Turn on the heating plate",
            ch: "3. 打开加热板",
        },
        putMold: {
            ko: "4. 거푸집 놓기",
            en: "4. Place the mold",
            ch: "4. 放置模具",
        },
        liftLever: {
            ko: "5. 좌측 레버를 올려 거푸집 내리기",
            en: "5. Raise the left lever to lower the mold",
            ch: "5. 提起左侧杠杆以放下模具",
        },
        placeMaterial: {
            ko: "6. 재료 놓고, 고정시키기",
            en: "6. Place the material and secure it",
            ch: "6. 放置材料并固定",
        },
        positionHeatingPlate: {
            ko: "7. 가열판 위치시키기",
            en: "7. Position the heating plate",
            ch: "7. 放置加热板",
        },
        settingTimer: {
            ko: "8. 재료에 맞는 타이머 설정",
            en: "8. Set the timer according to the material",
            ch: "8. 根据材料设置定时器",
        },
        onVacuumPump: {
            ko: "9. 시간이 되면 가열판 밀고, Vacuum pump 작동",
            en: "9. When the time is up, push the heating plate and activate the vacuum pump.",
            ch: "9. 时间到时，推热板并启动真空泵。",
        },
        pushLever: {
            ko: "10. 좌측 레버를 눌러서 거푸집 올리기",
            en: "10. Press the left lever to lift the mold.",
            ch: "10. 按下左侧杠杆抬起模具。",
        },
        pushPressureButton: {
            ko: "11. 양/음압 조절기를 2 ~ 3회 누르기",
            en: "11. Press the pressure control switch 2 to 3 times.",
            ch: "11. 按压正/负压调节器2到3次。",
        },
        downMold: {
            ko: "12. 레버를 올려 거푸집 내리기",
            en: "12. Raise the lever to lower the mold.",
            ch: "12. 抬起杠杆以降低模具。",
        },
        complete: {
            ko: "13. 완료",
            en: "13. Complete",
            ch: "13. 完成",
        },
        turnOff: {
            ko: "14. 완료 후, 모든 조작부 버튼 및 레버는 처음으로 맞추고 기기 전원 끄기",
            en: "14. After completion, reset all control buttons and levers to their original positions and turn off the machine.",
            ch: "14. 完成后，将所有操作部件按钮和杠杆复位到初始位置，并关闭设备电源。",
        },
    },
};