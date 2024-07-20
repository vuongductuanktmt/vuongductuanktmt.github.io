import {
  ClearOutlined,
  CustomerServiceOutlined,
  GithubOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { centerText, Scanner } from "@yudiel/react-qr-scanner";
import { useLocalStorageState, useToggle } from "ahooks";
import { FloatButton } from "antd";
import { User } from "firebase/auth";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Empty from "~/components/Empty";
import { ENV, KEYS } from "~/constants";
import TickIcon from "~/icons/TickIcon";
import { TelegramService } from "~/services";
import { IScanHistory } from "~/types";
export default function QRCodePage() {
  const [scanHistories, setScanHistories] = useLocalStorageState<
    IScanHistory[] | undefined
  >(KEYS.SCAN_HISTORIES, {
    defaultValue: [],
  });

  const [userProfile, setUserProfile] = useLocalStorageState<User>(
    KEYS.USER_PROFILE
  );

  const navigate = useNavigate();

  const [openMenu, { toggle: toggleMenu }] = useToggle(false);
  const clearHistory = () => {
    setScanHistories([]);
  };
  const handleLogout = () => {
    setUserProfile(undefined);
    navigate("/login");
  };
  const getSupport = () => {
    window.open(ENV.SUPPORT_FORM_URL);
  };
  const getGithub = () => {
    window.open(ENV.GITHUB_REPO_URL);
  };

  useEffect(() => {
    if (!userProfile) {
      navigate("/login");
    }
  }, [userProfile]);

  return (
    <>
      <div className="flex flex-col justify-center align-baseline h-screen">
        <h1 className="text-center absolute top-[20px] w-full animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black z-10">
          CandyQueen Report
        </h1>
        <Scanner
          onScan={(result) => {
            result.forEach((item) => {
              if (item.format === "qr_code") {
                const createdAt = moment().format("DD/MM/YYYY HH:mm:ss");
                TelegramService.sendMessage(
                  `<strong>📣 CandyQueen PetShop 📣</strong>\n<strong>[${userProfile?.displayName?.toLocaleUpperCase()}]</strong> Đã Quét Đơn Hàng <i>⭐${
                    item.rawValue
                  }⭐</i>\n⏱️ Vào lúc ${createdAt}`,
                  "-4225095637"
                ).then(({ data }) => {
                  if (data.ok) {
                    setScanHistories((codes) => [
                      {
                        code: item.rawValue,
                        createdAt,
                      },
                      ...(codes ?? []),
                    ]);
                  }
                });
              }
            });
          }}
          formats={["qr_code"]}
          styles={{
            container: {
              height: "50vh",
              objectFit: "cover",
              backgroundColor: "black",
            },
          }}
          components={{
            audio: true,
            onOff: true,
            torch: true,
            tracker: centerText,
            finder: false,
          }}
        />
        <div className="overflow-auto h-[50%]">
          {scanHistories?.length ? (
            <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 p-5">
              {scanHistories?.map((item, index) => (
                <li
                  className={`flex items-center ${
                    index === 0 ? "font-bold text-green-500" : ""
                  }`}
                  key={index}
                >
                  <TickIcon />[{item.code}] - {item.createdAt}
                </li>
              ))}
            </ul>
          ) : (
            <Empty
              title="Chưa có dữ liệu"
              description="Bạn có thể quét mã đơn hàng ngay lúc này ^_^"
            />
          )}
        </div>
      </div>
      <>
        <FloatButton.Group
          open={openMenu}
          onClick={toggleMenu}
          trigger="click"
          type="primary"
          style={{ right: 24, bottom: 24 }}
          icon={<MenuOutlined />}
        >
          <FloatButton
            icon={<CustomerServiceOutlined />}
            onClick={getSupport}
          />
          <FloatButton icon={<GithubOutlined />} onClick={getGithub} />
          <FloatButton icon={<ClearOutlined />} onClick={clearHistory} />
          <FloatButton
            icon={<LogoutOutlined style={{ color: "red" }} />}
            onClick={handleLogout}
          />
        </FloatButton.Group>
      </>
    </>
  );
}
