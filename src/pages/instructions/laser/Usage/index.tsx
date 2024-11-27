import {useState} from "react";
import Image from "@components/common/Image";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "../../instruction.style.ts";
import {laserInstruction} from "@constants/instruction/laserInstruction.ts";
import fan from "@assets/instruction_images/laser/laser_fan.jpg";
import on from "@assets/instruction_images/laser/laser_on.jpg";
import program from "@assets/instruction_images/laser/laser_program.jpg";
import programWindow from "@assets/instruction_images/laser/laser_program_window.jpg";
import importFile from "@assets/instruction_images/laser/laser_import_file.jpg";
import importFile2 from "@assets/instruction_images/laser/laser_import_file_2.jpg";
import checkFile from "@assets/instruction_images/laser/laser_check_file.jpg";
import mode from "@assets/instruction_images/laser/laser_mode.jpg";
import modeCategories from "@assets/instruction_images/laser/laser_mode_categories.jpg";
import speedPower from "@assets/instruction_images/laser/laser_speed_power.jpg";
import download from "@assets/instruction_images/laser/laser_download.jpg";
import downloadCurrent from "@assets/instruction_images/laser/laser_download_current.jpg";
import loading from "@assets/instruction_images/laser/laser_loading.jpg";
import downloaded from "@assets/instruction_images/laser/laser_downloaded.jpg";
import fileToMachine from "@assets/instruction_images/laser/laser_file_to_machine.jpg";
import guide from "@assets/instruction_images/laser/laser_guide.jpg";
import settingHeight from "@assets/instruction_images/laser/laser_setting_height.jpg";
import start from "@assets/instruction_images/laser/laser_start.jpg";


const Usage = () => {
    const [currentImage, setCurrentImage] = useState<number>(0);

    const {lang} = useThemeStore();

    const images = [
        fan,
        on,
        program,
        programWindow,
        importFile,
        importFile2,
        checkFile,
        mode,
        modeCategories,
        speedPower,
        download,
        downloadCurrent,
        loading,
        downloaded,
        fileToMachine,
        guide,
        settingHeight,
        start,
    ];

    return (
        <Container>
            <h3>{laserInstruction.usage.laserCutterUsage[lang]}</h3>

            <section>
                <p>{laserInstruction.usage.fanOn[lang]}</p>
                <Image images={images} targetIndex={0} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{laserInstruction.usage.laserOn[lang]}</p>
                <span>{laserInstruction.usage.pushBtn[lang]}</span>
                <Image images={images} targetIndex={1} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{laserInstruction.usage.activeProgram[lang]}</p>
                <span>{laserInstruction.usage.extension[lang]}</span>
                <Image images={images} targetIndex={2} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <span>{laserInstruction.usage.programWindow[lang]}</span>
                <Image images={images} targetIndex={3} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{laserInstruction.usage.importFile[lang]}</p>
                <span>{laserInstruction.usage.importSequence[lang]}</span>
                <Image images={images} targetIndex={4} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <Image images={images} targetIndex={5} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{laserInstruction.usage.checkFile[lang]}</p>
                <Image images={images} targetIndex={6} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{laserInstruction.usage.selectMode[lang]}</p>
                <span>{laserInstruction.usage.modeCategories[lang]}</span>
                <span>{laserInstruction.usage.cut[lang]}</span>
                <span>{laserInstruction.usage.engrave[lang]}</span>
                <span>{laserInstruction.usage.gradient[lang]}</span>
                <Image images={images} targetIndex={7} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <span>{laserInstruction.usage.color[lang]}</span>
                <span>{laserInstruction.usage.divideLayer[lang]}</span>
                <Image images={images} targetIndex={8} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{laserInstruction.usage.setting[lang]}</p>
                <span>{laserInstruction.usage.ingredient[lang]}</span>
                <span>{laserInstruction.usage.options[lang]}</span>
                <span>{laserInstruction.usage.needTest[lang]}</span>
                <Image images={images} targetIndex={9} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{laserInstruction.usage.download[lang]}</p>
                <Image images={images} targetIndex={10} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{laserInstruction.usage.downloadCurrent[lang]}</p>
                <span>{laserInstruction.usage.resetHistory[lang]}</span>
                <Image images={images} targetIndex={11} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <span>{laserInstruction.usage.loading[lang]}</span>
                <Image images={images} targetIndex={12} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <span>{laserInstruction.usage.downloadedFile[lang]}</span>
                <Image images={images} targetIndex={13} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{laserInstruction.usage.checkMachine[lang]}</p>
                <Image images={images} targetIndex={14} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{laserInstruction.usage.testBtn[lang]}</p>
                <span>{laserInstruction.usage.readjust[lang]}</span>

                <br/>
                <br/>
                <br/>
                <br/>

                <p>{laserInstruction.usage.guide[lang]}</p>
                <Image images={images} targetIndex={15} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <Image images={images} targetIndex={16} currentImage={currentImage} setCurrentImage={setCurrentImage}/>

                <p>{laserInstruction.usage.start[lang]}</p>
                <span>{laserInstruction.usage.cover[lang]}</span>
                <Image images={images} targetIndex={17} currentImage={currentImage} setCurrentImage={setCurrentImage}/>
            </section>
        </Container>
    );
};

export default Usage;