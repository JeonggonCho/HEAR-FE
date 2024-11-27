import {useState} from "react";
import Image from "@components/common/Image";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "../../instruction.style.ts";
import {printerInstruction} from "@constants/instruction/printerInstruction.ts";
import on from "@assets/instruction_images/printer/3d_printer_on.jpg";
import thermal from "@assets/instruction_images/printer/3d_printer_thermal.jpg";
import ingredient from "@assets/instruction_images/printer/3d_printer_indredient.jpg";
import thermalSetup from "@assets/instruction_images/printer/3d_printer_thermal_setup.jpg";
import usb from "@assets/instruction_images/printer/3d_printer_usb.jpg";
import copy1 from "@assets/instruction_images/printer/3d_printer_copy_1.jpg";
import copy2 from "@assets/instruction_images/printer/3d_printer_copy_2.jpg";
import copy3 from "@assets/instruction_images/printer/3d_printer_copy_3.jpg";
import copy4 from "@assets/instruction_images/printer/3d_printer_copy_4.jpg";
import copy5 from "@assets/instruction_images/printer/3d_printer_copy_5.jpg";
import copy6 from "@assets/instruction_images/printer/3d_printer_copy_6.jpg";
import copy7 from "@assets/instruction_images/printer/3d_printer_copy_7.jpg";
import removeUsb from "@assets/instruction_images/printer/3d_printer_remove_usb.jpg";
import autoLeveling from "@assets/instruction_images/printer/3d_printer_auto_leveling.jpg";
import cleaner from "@assets/instruction_images/printer/3d_printer_cleaner.jpg";
import nozzle from "@assets/instruction_images/printer/3d_printer_nozzle.jpg";
import axis from "@assets/instruction_images/printer/3d_printer_axis.jpg";
import sharp from "@assets/instruction_images/printer/3d_printer_sharp.jpg";
import touch from "@assets/instruction_images/printer/3d_printer_touch.jpg";


const Usage = () => {
    const [currentImage, setCurrentImage] = useState<number>(0);

    const {lang} = useThemeStore();

    const images = [
        on,
        thermal,
        ingredient,
        thermalSetup,
        usb,
        copy1,
        copy2,
        copy3,
        copy4,
        copy5,
        copy6,
        copy7,
        removeUsb,
        autoLeveling,
        cleaner,
        nozzle,
        axis,
        sharp,
        touch,
    ];

    return (
        <Container>
            <h3>{printerInstruction.usage.method[lang]}</h3>

            <section>
                <p>{printerInstruction.usage.turnOn[lang]}</p>
                <Image images={images} targetIndex={0} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{printerInstruction.usage.selectTemperature[lang]}</p>
                <Image images={images} targetIndex={1} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{printerInstruction.usage.selectMaterial[lang]}</p>
                <Image images={images} targetIndex={2} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{printerInstruction.usage.settingTemperature[lang]}</p>
                <Image images={images} targetIndex={3} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{printerInstruction.usage.linkUsb[lang]}</p>
                <span>{printerInstruction.usage.usbFormat[lang]}</span>
                <span>{printerInstruction.usage.usbIcon[lang]}</span>
                <Image images={images} targetIndex={4} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{printerInstruction.usage.copyMethod1[lang]}</p>
                <span>{printerInstruction.usage.copyMethod1Sequence[lang]}</span>
                <Image images={images} targetIndex={5} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <Image images={images} targetIndex={6} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <Image images={images} targetIndex={7} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{printerInstruction.usage.copyMethod2[lang]}</p>
                <span>{printerInstruction.usage.copyMethod2Sequence[lang]}</span>
                <Image images={images} targetIndex={8} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <Image images={images} targetIndex={9} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <Image images={images} targetIndex={10} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <Image images={images} targetIndex={11} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{printerInstruction.usage.removeUsb[lang]}</p>
                <Image images={images} targetIndex={12} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{printerInstruction.usage.autoLeveling[lang]}</p>
                <span>{printerInstruction.usage.defAutoLeveling[lang]}</span>
                <span>{printerInstruction.usage.autoLevelingTime[lang]}</span>
                <Image images={images} targetIndex={13} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{printerInstruction.usage.failAutoLeveling[lang]}</p>
                <span>{printerInstruction.usage.toolWarning[lang]}</span>
                <span>{printerInstruction.usage.removeFilament[lang]}</span>
                <Image images={images} targetIndex={14} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <Image images={images} targetIndex={15} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <span>{printerInstruction.usage.cleaningWorktable[lang]}</span>
                <span>{printerInstruction.usage.warningSharp[lang]}</span>
                <Image images={images} targetIndex={16} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <Image images={images} targetIndex={17} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{printerInstruction.usage.reAutoLeveling[lang]}</p>

                <br/>
                <br/>

                <p>{printerInstruction.usage.detachResult[lang]}</p>
                <span>{printerInstruction.usage.warningBurn[lang]}</span>
                <span>{printerInstruction.usage.warningDetach[lang]}</span>
                <span>{printerInstruction.usage.warningShrink[lang]}</span>
                <Image images={images} targetIndex={18} currentImage={currentImage} setCurrentImage={setCurrentImage}/>
            </section>
        </Container>
    );
};

export default Usage;