import {
  Avatar,
  Button,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { useLocalStorageState } from "ahooks";
import { message } from "antd";
import { User } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { KEYS } from "~/constants";
import { signInWithGoogle } from "~/services/firebase";

export default function LoginPage() {
  const [userProfile, setUserProfile] = useLocalStorageState<User>(
    KEYS.USER_PROFILE,
    { listenStorageChange: true }
  );
  const [notifyType, setNotifyType] = useLocalStorageState<
    "public" | "private"
  >(KEYS.NOTIFY_TYPE, { listenStorageChange: true, defaultValue: "public" });

  const [shopName, setShopName] = useLocalStorageState<string>(KEYS.SHOP_NAME, {
    listenStorageChange: true,
    defaultValue: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (userProfile && shopName) {
      navigate("/");
    }
  }, [userProfile]);

  const handleLoginGoogle = () => {
    signInWithGoogle().then((data) => {
      // navigate("/");
      setUserProfile(data);
    });
  };
  const handleLoginGitHub = () => {
    message.warning("Not implemented yet");
  };
  const handleLogout = () => {
    setUserProfile(undefined);
    setShopName("");
    setNotifyType("public");
  };
  const handleSubmit = () => {
    if (!shopName) {
      message.error("Vui lòng nhập tên Shop.");
      return;
    }
    navigate("/");
  };
  return (
    <div
      className="w-full bg-white p-6 dark:bg-gray-900 h-[100vh]"
      id="login-model"
    >
      <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 w-[92%]">
        {userProfile?.uid ? (
          <>
            <div className="text-center p-6 border-b">
              <Avatar
                src={userProfile?.photoURL || ""}
                alt={userProfile?.displayName || ""}
                withBorder={true}
                className="h-24 w-24 rounded-full mx-auto p-0.5"
              />

              <p className="pt-2 text-lg font-semibold ">
                {userProfile?.displayName}
              </p>
              <p className="text-sm text-gray-600">{userProfile?.email}</p>
              <div className="mt-5">
                <Button onClick={handleLogout} color="red">
                  Đăng xuất
                </Button>
              </div>
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Select
                label="Chọn loại thông báo"
                value={notifyType}
                onChange={(val) => setNotifyType(val as "public" | "private")}
              >
                <Option value="public">Công khai (nhanh đơn giản)</Option>
                <Option value="private">Riêng tư (cần cấu hình thêm)</Option>
              </Select>
              <Input
                label="Nhập tên shop"
                placeholder="Vui lòng nhập tên shop"
                crossOrigin={undefined}
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                maxLength={50}
                max={50}
              />
              <Button color="green" fullWidth onClick={handleSubmit}>
                Bắt Đầu
              </Button>
            </div>
          </>
        ) : (
          <div>
            <p className="text-2xl font-bold dark:text-white">
              Đăng nhập để tiếp tục
            </p>
            <p className="dark:text-gray-200">
              Sử dụng thông tin đăng nhập để biết ai là người quét đơn
            </p>
            <div className="mt-4">
              <a href="#" className="block">
                <button
                  className="w-full text-center py-2 my-3 border flex items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
                  onClick={handleLoginGoogle}
                >
                  <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    className="w-5 h-5 mr-2"
                    alt="Google Icon"
                  />
                  <span className="dark:text-gray-300">
                    Đăng nhập với Google
                  </span>
                </button>
              </a>
              <a href="#" className="block">
                <button
                  className="w-full text-center py-2 my-3 border flex items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
                  onClick={handleLoginGitHub}
                >
                  <img
                    src="https://www.svgrepo.com/show/349359/facebook.svg"
                    className="w-5 h-5 mr-2"
                    alt="Google Icon"
                  />
                  <span className="dark:text-gray-300">
                    Đăng nhập với Facebook
                  </span>
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
