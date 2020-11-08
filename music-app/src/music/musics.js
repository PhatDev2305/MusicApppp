// Audios
import VayHoaNhi_Audio from "./mp3/VayHoaNhi.mp3";
import KhongDamDau_Audio from "./mp3/HongDamDau.mp3";
import SummerTime_Audio from "./mp3/SummerTime.mp3";
import DeathBed_Audio from "./mp3/DeathBed.mp3";

// Img
import VayHoaNhi_Img from "./img/VayHoaNhi.jpg";
import SummerTime_Img from "./img/SummerTime.jpg";
import KhongDamDau_Img from "./img/KhongDamDau.jpg";
import DeathBed_Img from "./img/DeathBed.jpg";



let musics = [
    {   
        id : 1,
        name : 'Váy Hoa Nhí',
        artist: 'Hoàng Minh Châu',
        tag : 'Nhạc Pop',
        region : 'Việt Nam',
        src : VayHoaNhi_Audio,
        img : VayHoaNhi_Img,
        des : 'Phát hành vào 2020',
        duration: '2:59',
    },
    {
        id: 2,
        name : 'Summer Time',
        artist: 'Cinnamons x Evening Cinema',
        tag : 'Tình Yêu',
        region : 'Japan',
        src : SummerTime_Audio,
        img : SummerTime_Img,
        des : 'Đang cập nhật . . . ',
        duration: '4:11',
    },
    {
        id: 3,
        name : 'Không Dám Đâu',
        artist: 'Yuno BigBoy',
        tag : 'Rap/ Hip hop',
        region : 'Việt Nam',
        src : KhongDamDau_Audio,
        img : KhongDamDau_Img,
        des : 'Đang cập nhật . . . ',
        duration: '2:59',
    },
    {
        id: 4,
        name : 'Death Bed',
        artist: 'Powfu, Beabadoobee',
        tag : 'Nhạc Pop',
        region : 'Anh',
        src : DeathBed_Audio,
        img : DeathBed_Img,
        des : 'Đã phát hành: 2020 ...',
        duration: '2:54',
    },
]
export default musics;