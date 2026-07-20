import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BarChart3,

  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Expand,
  Globe2,
  Grid2X2,
  Heart,
  Home,
  LayoutDashboard,
  Menu,
  MoreVertical,
  Package,
  Phone,
  Puzzle,
  ReceiptText,
  Search,
  ShoppingBag,
  Star,
  Table2,
  TrendingUp,
  Truck,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import "./styles.css";
import Bell from "../public/assets/bell.svg";
import MessageSquareText from "../public/assets/comment.svg";
import Gift from "../public/assets/gift.svg";
import { api, getApiErrorMessage, getStoredToken, setStoredToken } from "./api";
import foodCollage from "./assets/food-collage.png";

const red = "#a80509";
const blue = "#63a9e8";

const sidebarItems = [
  { label: "Dashboard", icon: Grid2X2 },
  { label: "Ingredient Add", icon: ClipboardList },
  { label: "Analytics", icon: BarChart3 },
  { label: "Review", icon: TrendingUp },
  { label: "Order", icon: Star },
  { label: "Order List", icon: Puzzle },
  { label: "Customer List", icon: Globe2 },
  { label: "Icons", icon: ReceiptText, badge: "New" },
  { label: "Foods", icon: ClipboardList },
  { label: "Table", icon: Table2 },
  { label: "Table", icon: ClipboardList },
  { label: "forms", icon: Package },
];

const topAlerts = [
  { icon: Bell, count: 12 },
  { icon: MessageSquareText, count: 5 },
  { icon: Gift, count: 2, purple: true },
];

function IconGraphic({ icon: Icon, size = 20, className = "", alt = "" }) {
  if (typeof Icon === "string") {
    return <img src={Icon} alt={alt} width={size} height={size} className={className} />;
  }

  return <Icon size={size} className={className} />;
}

function createProfileFile(name = "profile.txt") {
  return new File([new Blob(["profile"], { type: "text/plain" })], name, { type: "text/plain" });
}


const foodImages = [
  foodCollage,
  "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80",
];

const trendingMenus = [
  ["Chicken curry special with cucumber", "$5.6", "Order 89x", foodImages[3]],
  ["Watermelon juice with ice", "$4.8", "Order 67x", foodImages[0]],
  ["Italiano pizza with garlic", "$12.3", "Order 59x", foodImages[1]],
  ["Tuna soup spinach with himalaya salt", "$3.6", "Order 49x", foodImages[4]],
  ["Medium Spicy Spagethi Italiano", "$4.2", "Order 49x", foodImages[2]],
];

const orderRows = [
  ["Tuna Soup spinach with himalaya salt.", "Jimmy Kueai", "South Corner st2", "$7.4", "x3", "PENDING", "#0010235", foodImages[4]],
  ["Mozarella Pizza With Random Topping", "Kinda Alexa", "Blue Ocean st.41551 London", "$8.2", "x1", "DELIVERED", "#0010299", foodImages[1]],
  ["Sweet Cheezy Pizza for Kids Meal (Small Size)", "Peter Parkur", "Franklin Avenue St.66125 London", "$4.2", "x2", "CANCELED", "#0010235", foodImages[2]],
  ["Tuna soup spinach with himalaya salt", "Jimmy Kueai", "South Corner st41256 london", "$7.4", "x3", "PENDING", "#0010235", foodImages[3]],
  ["Mozarella Pizza With Random Topping", "Cindy Alexa", "Blue Ocean St.41551 London", "$8.2", "x1", "CANCELED", "#0010299", foodImages[1]],
];

const orderListRows = [
  ["#245883", "27 April 2021,", "02:30 PM", "Hannah Doe", "128 Mclemore Rd, Taft, TN, 38488", "$85.2", "Delivery"],
  ["#245879", "14 April 2021,", "03:13 AM", "Aaliyah clark", "1623 E Updahl Ct, Harrison, ID, 83833", "$124.6", "Delivery"],
  ["#245880", "25 April 2021,", "11:22 AM", "Boone Doe", "261 Poplar Ave, Devon, PA, 19333", "$74.99", "New Order"],
  ["#245881", "25 April 2021,", "11:52 AM", "Carlie Paton", "8959 State 405 Rte, Maceo, KY, 42355", "$66.21", "Delivery"],
  ["#245882", "27 April 2021,", "02:25 PM", "Delilah", "4480 Ka Haku Rd, Princeville, HI, 96722", "$89.32", "New Order"],
  ["#245884", "27 April 2021,", "12:42 AM", "Emerson Clark", "505 E 14th St, Scotland Neck, NC, 27874", "$18.5", "Delivery"],
  ["#245885", "27 April 2021,", "12:32 AM", "Crystal Doe", "312 S Judd St, Sioux City, IA, 51103", "$125.2", "Delivery"],
  ["#245886", "29 April 2021,", "11:12 AM", "Jenny don", "4381 Rutledge Pike, Rutledge, TN, 37861", "$39.25", "On Delivery"],
  ["#245887", "29 April 2021,", "10:35 AM", "Joanne Clark", "Po Box 232, Bimble, KY, 40915", "$55.2", "On Delivery"],
  ["#245888", "30 April 2021,", "10:42 AM", "Madeline doe", "146 Patterson Dr, Hyneville, AL, 36040", "$24.55", "On Delivery"],
];

const orderDetailItems = [
  ["Watermelon juice with ice", "1x", "$4.12", "$4.12", foodImages[4]],
  ["Chicken curry special with cucumber", "3x", "$14.99", "$44.97", foodImages[3]],
  ["Italiano pizza with garlic", "1x", "$15.44", "$15.44", foodImages[2]],
];

const popularDishes = [
  ["Fish Burger", "$5.59", foodImages[0], true],
  ["Beef Burger", "$5.59", "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80", false],
  ["Cheese Burger", "$5.59", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80", false],
];

const recentCategoryOrders = [
  ["Fish Burger", "$5.59", "4.97 km • 21 min", "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=700&q=80"],
  ["Japan Ramen", "$5.59", "4.97 km • 21 min", "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=80"],
  ["Fried Rice", "$5.59", "4.97 km • 21 min", "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=80"],
];

const orderMenu = [
  ["Pepperoni Pizza", "x1", "+ $5.59", "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=300&q=80"],
  ["Cheese Burger", "x1", "+ $5.59", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80"],
  ["Vegan Pizza", "x1", "+ $5.59", "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=300&q=80"],
];

const reviewCards = [
  ["Jons Sena", "4.5", foodImages[1], "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80"],
  ["Sofia", "40", "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=500&q=80", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80"],
  ["Anandreansyah", "4.5", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80", ""],
  ["Jons Sena", "4.5", "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80", ""],
  ["Jons Sena", "4.5", "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=500&q=80", ""],
  ["Sofia", "40", "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80", ""],
  ["Anandreansyah", "4.5", "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80", ""],
  ["Jons Sena", "4.5", "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=500&q=80", ""],
];

const favoriteItems = [
  ["Watermelon Juice with Ice", "45%", "6732", "87%", foodImages[0]],
  ["Medium Spicy Pizza with Kemangi Leaf", "26%", "5721", "62%", foodImages[1]],
  ["Mozarella Pizza with Random Topping", "26%", "3515", "50%", foodImages[2]],
];

const loyalCustomers = [
  ["Alexander Queqe", "651 Times order", "bg-yellow-100"],
  ["Bella Simatupang", "356 Times order", "bg-blue-100"],
  ["Jordi Alaba", "125 Times order", "bg-slate-100"],
  ["Kevin Jamet", "78 Times order", "bg-orange-100"],
];

function truthyFlag(value) {
  return value === true || value === 1 || value === "1" || String(value).toLowerCase() === "true" || String(value).toUpperCase() === "YES";
}

function isKitchenOnboardingCompleted(kitchen) {
  if (!kitchen) return false;
  return truthyFlag(
    kitchen.isOnboardingCompleted ??
    kitchen.isOnboardinfCompleted ??
    kitchen.onboardingCompleted ??
    kitchen.onboarding?.isCompleted ??
    kitchen.onboarding?.completed
  );
}

function getKitchenSubscription(kitchen) {
  if (!kitchen) return null;
  return (
    kitchen.activeSubscription ||
    kitchen.currentSubscription ||
    kitchen.subscription ||
    kitchen.subscriptionPlan ||
    kitchen.plan ||
    kitchen.selectedSubscription ||
    null
  );
}

function hasSelectedSubscription(apiState) {
  const kitchen = apiState?.kitchen || {};
  const subscription = getKitchenSubscription(kitchen);
  return Boolean(
    apiState?.selectedPlan ||
    subscription?.id ||
    subscription?.subscriptionId ||
    kitchen.subscriptionId ||
    kitchen.subscriptionPlanId ||
    truthyFlag(kitchen.hasActiveSubscription) ||
    truthyFlag(kitchen.isSubscriptionActive) ||
    truthyFlag(kitchen.isSubscribed) ||
    truthyFlag(kitchen.planSelected) ||
    String(kitchen.subscriptionStatus || subscription?.status || "").toUpperCase() === "ACTIVE"
  );
}

function getRequiredSetupStep(apiState) {
  if (!apiState?.token) return "";
  if (!isKitchenOnboardingCompleted(apiState.kitchen)) return "onboarding";
  if (!hasSelectedSubscription(apiState)) return "subscription";
  return "";
}

function getPlanTitle(plan) {
  return plan?.name || plan?.title || plan?.planName || plan?.subscriptionName || `Plan #${plan?.id || ""}`;
}

function getPlanPrice(plan) {
  const amount = plan?.price ?? plan?.amount ?? plan?.monthlyPrice ?? plan?.planPrice;
  if (amount === undefined || amount === null || amount === "") return "Custom";
  const currency = plan?.currency || plan?.currencyCode || "INR";
  return `${currency} ${amount}`;
}

function App() {
  const [page, setPage] = useState("Dashboard");
  const [toast, setToast] = useState("");
  const [desktopAuthMode, setDesktopAuthMode] = useState("login");
  const [apiState, setApiState] = useState({
    online: false,
    message: "Connecting API...",
    token: getStoredToken(),
    kitchen: null,
    branches: [],
    menus: [],
    branchIngredients: [],
    stocks: [],
    cuisines: [],
    ingredients: [],
    plans: [],
    countries: [],
    states: [],
    cities: [],
    selectedPlan: null,
    loading: true,
  });

  const updateApiState = (patch) => setApiState((current) => ({ ...current, ...patch }));

  const refreshKitchenData = async (token = apiState.token, kitchen = apiState.kitchen) => {
    if (!token) return;
    if (kitchen?.isOnboardingCompleted === false) {
      updateApiState({
        branches: [],
        menus: [],
        branchIngredients: [],
        stocks: [],
        message: "Complete onboarding first, then select a plan to enable branch APIs.",
      });
      return;
    }
    try {
      const branchesResponse = await api.branches();
      const branches = Array.isArray(branchesResponse?.data) ? branchesResponse.data : [];
      let menus = [];
      let branchIngredients = [];
      let stocks = [];
      const firstBranchId = branches[0]?.id;
      if (firstBranchId) {
        try {
          const menuResponse = await api.menus(firstBranchId);
          menus = Array.isArray(menuResponse?.data) ? menuResponse.data : [];
        } catch (error) {
          menus = [];
        }
        try {
          const ingredientResponse = await api.branchIngredients(firstBranchId);
          branchIngredients = Array.isArray(ingredientResponse?.data) ? ingredientResponse.data : [];
        } catch (error) {
          branchIngredients = [];
        }
        try {
          const stockResponse = await api.stocks(firstBranchId);
          stocks = Array.isArray(stockResponse?.data) ? stockResponse.data : [];
        } catch (error) {
          stocks = [];
        }
      }
      updateApiState({ branches, menus, branchIngredients, stocks });
    } catch (error) {
      const message = getApiErrorMessage(error, "Kitchen APIs need login/onboarding/subscription");
      const setupMessage = message.toLowerCase().includes("onboarding")
        ? "Complete onboarding first, then select a plan to enable branch APIs."
        : message.toLowerCase().includes("subscription")
          ? "Select a subscription plan to enable branch APIs."
          : message;
      updateApiState({ branches: [], menus: [], branchIngredients: [], stocks: [], message: setupMessage });
    }
  };

  useEffect(() => {
    let mounted = true;
    async function boot() {
      try {
        await api.health();
        const [cuisineResponse, ingredientResponse, planResponse, countryResponse] = await Promise.allSettled([api.cuisines(), api.ingredients(), api.plans(), api.countries()]);
        if (!mounted) return;
        updateApiState({
          online: true,
          loading: false,
          message: "API connected",
          cuisines: cuisineResponse.status === "fulfilled" && Array.isArray(cuisineResponse.value?.data) ? cuisineResponse.value.data : [],
          ingredients: ingredientResponse.status === "fulfilled" && Array.isArray(ingredientResponse.value?.data) ? ingredientResponse.value.data : [],
          plans: planResponse.status === "fulfilled" && Array.isArray(planResponse.value?.data) ? planResponse.value.data : [],
          countries: countryResponse.status === "fulfilled" && Array.isArray(countryResponse.value?.data) ? countryResponse.value.data : [],
        });

        const token = getStoredToken();
        if (token) {
          try {
            const verified = await api.verify(token);
            if (!mounted) return;
            const verifiedKitchen = verified?.kitchen || verified?.data?.kitchen || null;
            updateApiState({ token, kitchen: verifiedKitchen });
            await refreshKitchenData(token, verifiedKitchen);
          } catch {
            setStoredToken("");
            updateApiState({ token: "", kitchen: null });
          }
        }
      } catch (error) {
        if (!mounted) return;
        updateApiState({
          online: false,
          loading: false,
          message: `API offline: ${getApiErrorMessage(error, "Unable to connect API")}`,
        });
      }
    }
    boot();
    return () => {
      mounted = false;
    };
  }, []);

  const handleLogin = async ({ username, password }) => {
    const response = await api.login({ username, password });
    const token = response?.data?.token;
    if (!token) throw new Error("Login response did not include token");
    const kitchen = response?.data?.kitchen || null;
    setStoredToken(token);
    updateApiState({ token, kitchen, online: true, message: "Logged in" });
    setDesktopAuthMode("login");
    setPage(isKitchenOnboardingCompleted(kitchen) ? "Ingredient Add" : "Onboarding");
    await refreshKitchenData(token, kitchen);
    return response;
  };

  const reloadKitchenProfile = async (fallbackPatch = {}) => {
    const token = getStoredToken();
    const fallbackKitchen = { ...(apiState.kitchen || {}), ...fallbackPatch };
    try {
      const verified = await api.verify(token);
      const verifiedKitchen = verified?.kitchen || verified?.data?.kitchen || fallbackKitchen;
      updateApiState({ kitchen: { ...verifiedKitchen, ...fallbackPatch } });
      return { ...verifiedKitchen, ...fallbackPatch };
    } catch {
      updateApiState({ kitchen: fallbackKitchen });
      return fallbackKitchen;
    }
  };

  const handleOnboardingCompleted = async () => {
    const kitchen = await reloadKitchenProfile({ isOnboardingCompleted: true });
    updateApiState({ message: "Onboarding completed. Select a subscription plan." });
    setPage(hasSelectedSubscription({ ...apiState, kitchen }) ? "Ingredient Add" : "Subscription Plans");
  };

  const handlePlanSelected = async (plan) => {
    const kitchen = await reloadKitchenProfile({});
    updateApiState({ selectedPlan: plan, kitchen, message: "Subscription plan selected." });
    setPage("Ingredient Add");
    await refreshKitchenData(apiState.token, kitchen);
  };

  const handleLogout = () => {
    setStoredToken("");
    updateApiState({ token: "", kitchen: null, branches: [], menus: [], branchIngredients: [], stocks: [], selectedPlan: null, message: "Logged out" });
    setPage("Dashboard");
    setDesktopAuthMode("login");
    setToast("Logged out");
  };

  const liveMenuItems = useMemo(() => {
    if (!apiState.menus.length) return [];
    return apiState.menus.map((menu) => ({
      name: menu.name || "Menu Item",
      price: menu.price ? `$${Number(menu.price).toFixed(2)}` : "$5.59",
      image: menu.image || foodImages[1],
      description: menu.description || "Live menu item from backend",
    }));
  }, [apiState.menus]);

  const requiredSetupStep = getRequiredSetupStep(apiState);
  const visiblePage = requiredSetupStep === "onboarding" ? "Onboarding" : requiredSetupStep === "subscription" ? "Subscription Plans" : page;

  return (
    <div className="min-h-screen bg-[#F7F6F6] text-[#191919]">
      <div className="lg:hidden">
        <MobileApp apiState={apiState} onLogin={handleLogin} onLogout={handleLogout} />
      </div>
      <div className="hidden min-h-screen lg:flex">
        {!apiState.token ? (
          <DesktopAuthPage mode={desktopAuthMode} setMode={setDesktopAuthMode} onLogin={handleLogin} />
        ) : requiredSetupStep ? (
          <SetupFlowPage
            step={requiredSetupStep}
            apiState={apiState}
            onLogout={handleLogout}
            onOnboardingCompleted={handleOnboardingCompleted}
            onPlanSelected={handlePlanSelected}
          />
        ) : (
          <>
            <Sidebar page={visiblePage} setPage={setPage} />
            <main className="min-w-0 flex-1 lg:pl-[300px]">
              <Topbar title={visiblePage} apiState={apiState} onLogout={handleLogout} setPage={setPage} onToast={setToast} onLogin={handleLogin} refreshKitchenData={refreshKitchenData} />
              <div className="page-shell px-5 py-7 sm:px-8 lg:px-10">
                {visiblePage === "Analytics" ? (
                  <AnalyticsPage setPage={setPage} />
                ) : visiblePage === "Order" ? (
                  <OrderPage setPage={setPage} />
                ) : visiblePage === "Order List" ? (
                  <OrderListPage setPage={setPage} />
                ) : visiblePage === "Customer List" ? (
                  <CustomerListPage setPage={setPage} />
                ) : visiblePage === "Category" ? (
                  <CategoryPage setPage={setPage} liveMenuItems={liveMenuItems} apiState={apiState} />
                ) : visiblePage === "Add Menu" ? (
                  <AddMenuPage setPage={setPage} apiState={apiState} refreshKitchenData={refreshKitchenData} />
                ) : visiblePage === "Customer Review" ? (
                  <CustomerReviewPage />
                ) : visiblePage === "Add / Edit Kitchen" ? (
                  <KitchenFormPage setPage={setPage} apiState={apiState} refreshKitchenData={refreshKitchenData} />
                ) : visiblePage === "Ingredient Add" ? (
                  <IngredientSetupPage apiState={apiState} refreshKitchenData={refreshKitchenData} selectedPlan={apiState.selectedPlan || getKitchenSubscription(apiState.kitchen)} />
                ) : visiblePage === "Icons" ? (
                  <UtilityPage title="Icons" subtitle="Reusable action icons and quick links for the kitchen app." setPage={setPage} />
                ) : visiblePage === "Table" ? (
                  <UtilityPage title="Table" subtitle="Compact restaurant data table preview." setPage={setPage} />
                ) : (
                  <DashboardPage setPage={setPage} apiState={apiState} />
                )}
              </div>
            </main>
          </>
        )}
      </div>
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}
    </div>
  );
}

function Sidebar({ page, setPage }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[300px] flex-col overflow-hidden bg-[#8D0606] text-white lg:flex">
      <div className="shrink-0 px-8 pb-8 pt-8">
        <div className="flex items-center gap-4">
          <div className="">
            <img src="./assets/logo.png" alt="" className="size-16 w-full h-full" />
          </div>
          <div className="text-[31px] font-semibold uppercase leading-[0.93] tracking-tight">Cloud Kitchen</div>
        </div>
      </div>

      <nav className="sidebar-scroll flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-6 pb-5">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          const active = page === item.label || (page === "Category" && item.label === "Foods") || (page === "Customer Review" && item.label === "Review") || (page === "Add / Edit Kitchen" && item.label === "forms") || (page === "Dashboard" && index === 0);
          return (
            <button
              key={`${item.label}-${index}`}
              onClick={() => {
                if (item.label === "Foods") return setPage("Category");
                if (item.label === "Review") return setPage("Customer Review");
                if (item.label === "forms") return setPage("Add / Edit Kitchen");
                if (["Dashboard", "Ingredient Add", "Analytics", "Order", "Order List", "Customer List", "Icons", "Table", "Add Menu"].includes(item.label)) return setPage(item.label);
                return null;
              }}
              type="button"
              className={`flex h-[56px] shrink-0 items-center gap-4 rounded-[34px] px-7 text-left text-[18px] font-semibold transition ${active ? "bg-white text-[#8D0606]" : "text-white hover:bg-white/10"
                }`}
            >
              <Icon size={22} strokeWidth={active ? 2.4 : 1.8} />
              <span className="flex-1">{item.label}</span>
              {item.badge ? <span className="rounded-md bg-[#25c55b] px-3 py-1 text-[10px] font-bold text-white">{item.badge}</span> : null}
              {active && item.label === "Dashboard" ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
          );
        })}
      </nav>

      <div className="shrink-0 px-8 pb-8 pt-4">
        <div className="mb-6 rounded-[22px] bg-white px-7 py-6 text-[#747474]">
          <Grid2X2 size={20} className="mb-4 text-[#b5b5b5]" />
          <p className="mb-5 text-sm leading-5">Organize your menus through button bellow</p>
          <button className="h-12 w-full rounded-[24px] bg-[#8D0606] text-base font-semibold text-white" onClick={() => setPage("Add Menu")} type="button">
            +Add Menus
          </button>
        </div>

        <div className="text-sm leading-7 text-white/90">
          <p>Koki Restaurant Admin Dashboard</p>
          <p>© 2023 All Rights Reserved</p>
          <p>Made with <Heart className="inline text-white" size={17} fill="currentColor" /> by DexignZone</p>
        </div>
      </div>
    </aside>
  );
}

function DesktopAuthPage({ mode, setMode, onLogin }) {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    kitchenName: "",
    phone: "",
    email: "",
    password: "",
    contactFirstName: "",
    contactLastName: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [forgotForm, setForgotForm] = useState({ username: "", token: "", password: "", confirmPassword: "" });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const submitLogin = async (event) => {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      await onLogin(loginForm);
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Login failed"));
    } finally {
      setBusy(false);
    }
  };

  const submitRegister = async (event) => {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      await api.register({
        ...registerForm,
        contactTitle: "MR",
        contactEmail: registerForm.contactEmail || registerForm.email,
        contactPhone: registerForm.contactPhone || registerForm.phone,
        profilePicture: createProfileFile("desktop-profile.txt"),
      });
      setMessage("Registration complete. Login with your email/phone.");
      setMode("login");
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Registration failed"));
    } finally {
      setBusy(false);
    }
  };

  const requestReset = async () => {
    setBusy(true);
    setMessage("");
    try {
      const response = await api.forgotPassword(forgotForm.username);
      const token = response?.data?.resetToken || response?.resetToken || "";
      setForgotForm((current) => ({ ...current, token }));
      setMessage(token ? "Reset token received. Enter new password." : "Reset requested. Enter the token from email/logs.");
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Reset request failed"));
    } finally {
      setBusy(false);
    }
  };

  const submitReset = async (event) => {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      await api.resetPassword({ token: forgotForm.token, password: forgotForm.password, confirmPassword: forgotForm.confirmPassword });
      setMessage("Password reset successful. Login now.");
      setMode("login");
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Password reset failed"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="grid min-h-screen flex-1 place-items-center bg-[#F7F6F6] px-6 py-10">
      <Card className="w-full max-w-[520px] p-8">
        <div className="mb-7 flex items-center gap-4">
          <img src="./assets/logo.png" alt="" className="size-16" />
          <div>
            <h1 className="text-3xl font-semibold text-[#8D0606]">Cloud Kitchen</h1>
            <p className="mt-1 text-sm text-[#777]">Login to manage your kitchen data.</p>
          </div>
        </div>
        <div className="mb-6 grid grid-cols-3 rounded-full bg-[#f3f3f3] p-1 text-sm font-bold">
          {["login", "register", "forgot"].map((tab) => (
            <button key={tab} className={`rounded-full py-2 capitalize ${mode === tab ? "bg-[#8D0606] text-white" : "text-[#777]"}`} onClick={() => { setMode(tab); setMessage(""); }} type="button">
              {tab}
            </button>
          ))}
        </div>

        {mode === "login" ? (
          <form className="space-y-4" onSubmit={submitLogin}>
            <Field label="Email / Phone" placeholder="Enter email or phone" value={loginForm.username} onChange={(e) => setLoginForm((f) => ({ ...f, username: e.target.value }))} />
            <Field label="Password" placeholder="Enter password" type="password" value={loginForm.password} onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))} />
            <button className="h-12 w-full rounded-lg bg-[#8D0606] font-semibold text-white disabled:opacity-60" disabled={busy} type="submit">{busy ? "Logging in..." : "Login"}</button>
          </form>
        ) : mode === "register" ? (
          <form className="grid gap-4 md:grid-cols-2" onSubmit={submitRegister}>
            <Field label="Kitchen Name" value={registerForm.kitchenName} onChange={(e) => setRegisterForm((f) => ({ ...f, kitchenName: e.target.value }))} />
            <Field label="Phone" value={registerForm.phone} onChange={(e) => setRegisterForm((f) => ({ ...f, phone: e.target.value }))} />
            <Field label="Email" value={registerForm.email} onChange={(e) => setRegisterForm((f) => ({ ...f, email: e.target.value }))} />
            <Field label="Password" type="password" value={registerForm.password} onChange={(e) => setRegisterForm((f) => ({ ...f, password: e.target.value }))} />
            <Field label="Contact First Name" value={registerForm.contactFirstName} onChange={(e) => setRegisterForm((f) => ({ ...f, contactFirstName: e.target.value }))} />
            <Field label="Contact Last Name" value={registerForm.contactLastName} onChange={(e) => setRegisterForm((f) => ({ ...f, contactLastName: e.target.value }))} />
            <button className="h-12 rounded-lg bg-[#8D0606] font-semibold text-white disabled:opacity-60 md:col-span-2" disabled={busy} type="submit">{busy ? "Creating..." : "Register"}</button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={submitReset}>
            <Field label="Email / Phone" placeholder="Enter email or phone" value={forgotForm.username} onChange={(e) => setForgotForm((f) => ({ ...f, username: e.target.value }))} />
            <button className="h-11 w-full rounded-lg bg-[#fff1f1] font-bold text-[#8D0606]" disabled={busy || !forgotForm.username} onClick={requestReset} type="button">Request Reset Token</button>
            <Field label="Reset Token" placeholder="Token from email/backend response" value={forgotForm.token} onChange={(e) => setForgotForm((f) => ({ ...f, token: e.target.value }))} />
            <Field label="New Password" type="password" value={forgotForm.password} onChange={(e) => setForgotForm((f) => ({ ...f, password: e.target.value }))} />
            <Field label="Confirm Password" type="password" value={forgotForm.confirmPassword} onChange={(e) => setForgotForm((f) => ({ ...f, confirmPassword: e.target.value }))} />
            <button className="h-12 w-full rounded-lg bg-[#8D0606] font-semibold text-white disabled:opacity-60" disabled={busy} type="submit">{busy ? "Saving..." : "Reset Password"}</button>
          </form>
        )}
        {message ? <p className="mt-5 whitespace-pre-line text-sm font-bold text-[#8D0606]">{message}</p> : null}
      </Card>
    </main>
  );
}

function MobileApp({ apiState, onLogin, onLogout }) {
  const [screen, setScreen] = useState("splash");
  const [cartCount, setCartCount] = useState(2);
  const [verifyContext, setVerifyContext] = useState({ mode: "", username: "", token: "" });

  const screens = {
    splash: <MobileSplash onNext={() => setScreen("onboard")} />,
    onboard: <MobileOnboard onNext={() => setScreen("login")} />,
    login: <MobileLogin onNext={() => setScreen("home")} setScreen={setScreen} onLogin={onLogin} />,
    signup: <MobileSignup setScreen={setScreen} setVerifyContext={setVerifyContext} />,
    forgot: <MobileForgot setScreen={setScreen} setVerifyContext={setVerifyContext} />,
    verify: <MobileVerify setScreen={setScreen} verifyContext={verifyContext} />,
    location: <MobileLocation setScreen={setScreen} />,
    home: <MobileHome setScreen={setScreen} cartCount={cartCount} />,
    detail: <MobileDetail setScreen={setScreen} setCartCount={setCartCount} />,
    filter: <MobileFilter setScreen={setScreen} />,
    cart: <MobileCart setScreen={setScreen} />,
    payment: <MobilePayment setScreen={setScreen} />,
    success: <MobileSuccess setScreen={setScreen} />,
    track: <MobileTrack setScreen={setScreen} />,
    chat: <MobileChat setScreen={setScreen} />,
    profile: <MobileProfile setScreen={setScreen} onLogout={onLogout} />,
  };

  return (
    <div className="min-h-screen bg-[#eef1f5] px-3 py-4">
      <div className="mx-auto min-h-[calc(100vh-32px)] max-w-[430px] overflow-hidden rounded-[28px] bg-white shadow-[0_16px_50px_rgba(15,23,42,0.14)]">
        <div className="bg-[#fff8f8] px-4 py-2 text-center text-[11px] font-bold text-[#8D0606]">
          {apiState?.online ? "API connected" : "Demo mode - backend offline"}
        </div>
        {screens[screen]}
      </div>
    </div>
  );
}

function MobileLogo({ compact = false }) {
  return (
    <div className={`flex items-center gap-2 ${compact ? "" : "justify-center"}`}>
      <div className="">
            <img src="./assets/logo.png" alt="" className="size-16 " />
          </div>
      <span className="text-lg font-bold uppercase leading-[0.9] ">Cloud<br />Kitchens</span>
    </div>
  );
}

function MobileHeader({ setScreen, cartCount = 0, title }) {
  return (
    <div className="flex items-center justify-between px-5 pb-3 pt-5">
      {title ? (
        <button className="grid size-9 place-items-center rounded-full bg-[#8D0606] text-white" onClick={() => setScreen("home")} type="button">
          <ChevronRight className="rotate-180" size={18} />
        </button>
      ) : (
        <MobileLogo className="text-[#8D0606]" compact />
      )}
      {title ? <h1 className="text-lg font-semibold">{title}</h1> : null}
      <button className="relative grid size-10 place-items-center rounded-full bg-[#8D0606] text-white" onClick={() => setScreen("cart")} type="button">
        <ShoppingBag size={18} />
        {cartCount ? <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-orange-400 text-xs font-semibold">{cartCount}</span> : null}
      </button>
    </div>
  );
}

function MobileSplash({ onNext }) {
  return (
    <div className="flex min-h-[760px] flex-col justify-between bg-white px-8 py-12">
      <div />
      <div className="rounded-md bg-[#8D0606] px-6 py-4 text-white"><MobileLogo   className="text-[#fff]" compact /></div>
      <button className="h-12 rounded-md bg-[#8D0606] text-sm font-semibold text-white" onClick={onNext} type="button">START</button>
    </div>
  );
}

function MobileOnboard({ onNext }) {
  return (
    <div className="flex min-h-[760px] flex-col justify-between bg-white px-8 py-10 text-center">
      <div className="pt-14">
        <div className="mx-auto grid size-44 place-items-center rounded-full bg-[#fff3dc] text-7xl">🍽</div>
        <h1 className="mt-10 text-xl font-semibold">All your favorites</h1>
        <p className="mx-auto mt-4 max-w-[260px] text-sm leading-6 text-[#8b8b8b]">Get all your loved foods in one place, you just place the order we do the rest.</p>
        <p className="mt-5 text-[#8D0606]">● ● ○ ○</p>
      </div>
      <div>
        <button className="h-12 w-full rounded-md bg-[#8D0606] text-sm font-semibold text-white" onClick={onNext} type="button">NEXT</button>
        <button className="mt-4 text-xs text-[#999]" onClick={onNext} type="button">Skip</button>
      </div>
    </div>
  );
}

function MobileLogin({ onNext, setScreen, onLogin }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    setMessage("");
    try {
      await onLogin(credentials);
      onNext();
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Login failed"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[760px] bg-white">
      <div className="rounded-b-[18px] bg-[#8D0606] px-8 py-12 text-center text-white">
        <h1 className="text-xl font-semibold">Log In</h1>
        <p className="mt-3 text-xs text-white/80">Please sign in to your existing account</p>
      </div>
      <div className="space-y-4 px-7 py-8">
        <MobileInput label="Email" placeholder="demo@gmail.com" value={credentials.username} onChange={(e) => setCredentials((c) => ({ ...c, username: e.target.value }))} />
        <MobileInput label="Password" placeholder="Password" type="password" value={credentials.password} onChange={(e) => setCredentials((c) => ({ ...c, password: e.target.value }))} />
        <div className="flex items-center justify-between text-xs text-[#8b8b8b]">
          <label className="flex items-center gap-2"><input type="checkbox" /> Remember me</label>
          <button className="text-[#8D0606]" onClick={() => setScreen("forgot")} type="button">Forgot Password</button>
        </div>
        <button className="h-12 w-full rounded-md bg-[#8D0606] text-sm font-semibold text-white disabled:opacity-60" disabled={busy} onClick={submit} type="button">{busy ? "..." : "LOG IN"}</button>
        {message ? <p className="whitespace-pre-line text-center text-xs font-bold text-[#8D0606]">{message}</p> : null}
        <p className="text-center text-xs text-[#777]">Don&apos;t have an account? <button className="text-[#8D0606]" onClick={() => setScreen("signup")} type="button">SIGN UP</button></p>
        <div className="flex justify-center gap-5 pt-3 text-lg">
          <span>f</span><span>t</span><span>●</span>
        </div>
      </div>
    </div>
  );
}

function MobileSignup({ setScreen, setVerifyContext }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const updateForm = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const submit = async () => {
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const [firstName, ...lastNameParts] = (form.name || "Mobile User").trim().split(/\s+/);
      await api.register({
        kitchenName: form.name || "Cloud Kitchen Mobile",
        phone: form.phone,
        email: form.email,
        password: form.password,
        contactTitle: "MR",
        contactFirstName: firstName || "Mobile",
        contactLastName: lastNameParts.join(" ") || "User",
        contactEmail: form.email,
        contactPhone: form.phone,
        profilePicture: createProfileFile(),
      });
      setVerifyContext({ mode: "signup", username: form.email || form.phone, token: "" });
      setScreen("verify");
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Signup failed"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[760px] bg-white">
      <MobileHeader setScreen={setScreen} title="Sign Up" />
      <div className="rounded-b-[18px] bg-[#8D0606] px-8 py-8 text-center text-white">
        <h1 className="text-xl font-semibold">Sign Up</h1>
        <p className="mt-3 text-xs text-white/80">Please sign up to get started</p>
      </div>
      <div className="space-y-4 px-7 py-8">
        <MobileInput label="Name" placeholder="John Doe" value={form.name} onChange={updateForm("name")} />
        <MobileInput label="Email" placeholder="demo@gmail.com" value={form.email} onChange={updateForm("email")} />
        <MobileInput label="Phone" placeholder="9876543210" value={form.phone} onChange={updateForm("phone")} />
        <MobileInput label="Password" placeholder="Password" type="password" value={form.password} onChange={updateForm("password")} />
        <MobileInput label="Re-type Password" placeholder="Password" type="password" value={form.confirmPassword} onChange={updateForm("confirmPassword")} />
        <button className="h-12 w-full rounded-md bg-[#8D0606] text-sm font-semibold text-white disabled:opacity-60" disabled={busy} onClick={submit} type="button">{busy ? "..." : "SEND CODE"}</button>
        {message ? <p className="whitespace-pre-line text-center text-xs font-bold text-[#8D0606]">{message}</p> : null}
      </div>
    </div>
  );
}

function MobileForgot({ setScreen, setVerifyContext }) {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const submit = async () => {
    try {
      const response = await api.forgotPassword(username);
      setVerifyContext({ mode: "reset", username, token: response?.data?.resetToken || response?.resetToken || "" });
      setMessage("Reset requested.");
      setScreen("verify");
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Request failed"));
    }
  };

  return (
    <div className="min-h-[760px] bg-white">
      <MobileHeader setScreen={setScreen} title="Forgot Password" />
      <div className="rounded-b-[18px] bg-[#8D0606] px-8 py-8 text-center text-white">
        <h1 className="text-xl font-semibold">Forgot Password</h1>
        <p className="mt-3 text-xs text-white/80">Please sign in to your existing account</p>
      </div>
      <div className="space-y-5 px-7 py-8">
        <MobileInput label="Email" placeholder="demo@gmail.com" value={username} onChange={(e) => setUsername(e.target.value)} />
        <button className="h-12 w-full rounded-md bg-[#8D0606] text-sm font-semibold text-white" onClick={submit} type="button">SEND CODE</button>
        {message ? <p className="whitespace-pre-line text-center text-xs font-bold text-[#8D0606]">{message}</p> : null}
      </div>
    </div>
  );
}

function MobileVerify({ setScreen, verifyContext }) {
  const [token, setToken] = useState(verifyContext?.token || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (verifyContext?.mode !== "reset") {
      setScreen("location");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      await api.resetPassword({ token, password, confirmPassword });
      setMessage("Password reset successful.");
      setScreen("login");
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Verification failed"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[760px] bg-white">
      <MobileHeader setScreen={setScreen} title="Verification" />
      <div className="rounded-b-[18px] bg-[#8D0606] px-8 py-8 text-center text-white">
        <h1 className="text-xl font-semibold">Verification</h1>
        <p className="mt-3 text-xs text-white/80">{verifyContext?.mode === "reset" ? "Enter reset token and new password" : "Registration completed"}</p>
      </div>
      <div className="space-y-4 px-7 py-8">
        {verifyContext?.mode === "reset" ? (
          <>
            <MobileInput label="Reset Token" placeholder="Token" value={token} onChange={(e) => setToken(e.target.value)} />
            <MobileInput label="New Password" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <MobileInput label="Confirm Password" placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </>
        ) : (
          <p className="rounded-md bg-[#fff1f1] px-4 py-3 text-center text-xs font-bold text-[#8D0606]">Email OTP endpoint is not available in backend yet. Continue to login/location.</p>
        )}
        <button className="h-12 w-full rounded-md bg-[#8D0606] text-sm font-semibold text-white disabled:opacity-60" disabled={busy} onClick={submit} type="button">{busy ? "..." : "VERIFY"}</button>
        {message ? <p className="whitespace-pre-line text-center text-xs font-bold text-[#8D0606]">{message}</p> : null}
      </div>
    </div>
  );
}

function MobileLocation({ setScreen }) {
  return (
    <div className="flex min-h-[760px] flex-col justify-between bg-white px-8 py-10 text-center">
      <MobileHeader setScreen={setScreen} title="Location" />
      <div>
        <div className="mx-auto grid size-52 place-items-center text-8xl">📍</div>
        <h1 className="mt-8 text-xl font-semibold">Location</h1>
        <p className="mx-auto mt-3 max-w-[260px] text-sm leading-6 text-[#777]">Find restaurants near you by allowing location access.</p>
      </div>
      <button className="h-12 rounded-md bg-[#8D0606] text-sm font-semibold text-white" onClick={() => setScreen("home")} type="button">ACCESS LOCATION</button>
    </div>
  );
}

function MobileInput({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-[#777]">{label}</span>
      <input className="h-12 w-full rounded-md bg-[#f0f1f4] px-4 text-sm outline-none" {...props} />
    </label>
  );
}

function MobileHome({ setScreen, cartCount }) {
  const cats = ["All", "Hot Dog", "Burger"];
  return (
    <div className="min-h-[760px] bg-white pb-5">
      <MobileHeader setScreen={setScreen} cartCount={cartCount} />
      <div className="px-5">
        <p className="text-xs font-semibold text-[#777]">Hey Good Afternoon!</p>
        <button className="mt-3 flex h-11 w-full items-center gap-3 rounded-md bg-[#f2f3f5] px-4 text-left text-xs text-[#8b8b8b]" type="button">
          <Search size={16} /> Search dishes, restaurants
        </button>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-bold">All Categories</p>
          <button className="text-xs text-[#8D0606]" type="button">See All &gt;</button>
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
          {cats.map((cat, index) => (
            <button key={cat} className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold ${index === 0 ? "bg-[#8D0606] text-white" : "bg-[#f5f1e8]"}`} type="button">{cat}</button>
          ))}
        </div>
        <MobileRestaurantCard setScreen={setScreen} />
        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm font-bold">Popular Fast Food</p>
          <button className="text-xs text-[#8D0606]" onClick={() => setScreen("filter")} type="button">Filter</button>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {popularDishes.slice(1).map((dish) => (
            <button key={dish[0]} className="rounded-lg border border-[#eee] bg-white p-3 text-left shadow-sm" onClick={() => setScreen("detail")} type="button">
              <img src={dish[2]} alt="" className="h-20 w-full rounded-md object-cover" />
              <p className="mt-2 text-sm font-semibold">{dish[0]}</p>
              <p className="text-xs text-[#8D0606]">{dish[1]}</p>
            </button>
          ))}
        </div>
      </div>
      <MobileBottomNav setScreen={setScreen} active="home" />
    </div>
  );
}

function MobileRestaurantCard({ setScreen }) {
  return (
    <button className="mt-4 w-full rounded-lg bg-white text-left shadow-sm" onClick={() => setScreen("detail")} type="button">
      <img src={foodImages[1]} alt="" className="h-36 w-full rounded-lg object-cover" />
      <h2 className="mt-3 px-1 text-sm font-semibold">Medium Spicy Pizza with Kemangi Leaf</h2>
      <div className="flex gap-5 px-1 py-3 text-xs text-[#777]">
        <span className="text-[#8D0606]">★ 4.8</span><span>Free</span><span>25 min</span>
      </div>
    </button>
  );
}

function MobileDetail({ setScreen, setCartCount }) {
  return (
    <div className="min-h-[760px] bg-white">
      <MobileHeader setScreen={setScreen} title="Details" />
      <div className="px-5 pb-6">
        <div className="relative overflow-hidden rounded-lg bg-[#8D0606]">
          <img src={foodImages[3]} alt="" className="h-52 w-full object-cover opacity-95" />
          <button className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-white text-[#8D0606]" type="button"><Heart fill="currentColor" size={19} /></button>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-[#777]"><Globe2 size={15} /> Uttara Coffee House</div>
        <h1 className="mt-3 text-xl font-semibold">Pizza Calzone European</h1>
        <p className="mt-3 text-sm leading-6 text-[#777]">Premium restaurant meal with fresh ingredients, crispy crust and chef prepared sauce.</p>
        <div className="mt-4 flex gap-6 text-xs text-[#777]"><span className="text-[#8D0606]">★ 4.8</span><span>Free</span><span>20 min</span></div>
        <div className="mt-6 flex gap-3">
          {["10\"", "14\"", "20\""].map((size, i) => <button key={size} className={`size-12 rounded-full text-sm font-bold ${i === 1 ? "bg-[#8D0606] text-white" : "bg-[#f4f4f4]"}`} type="button">{size}</button>)}
        </div>
        <div className="mt-8 flex items-center justify-between">
          <b className="text-lg">$6.53</b>
          <div className="flex items-center rounded-full bg-black px-4 py-2 text-white"><button type="button">-</button><span className="px-4">2</span><button type="button">+</button></div>
        </div>
        <button className="mt-7 h-12 w-full rounded-md bg-[#8D0606] text-sm font-semibold text-white" onClick={() => { setCartCount((n) => n + 1); setScreen("cart"); }} type="button">ADD TO CART</button>
      </div>
    </div>
  );
}

function MobileCart({ setScreen }) {
  return (
    <div className="min-h-[760px] bg-[#8D0606] text-white">
      <MobileHeader setScreen={setScreen} title="Cart" />
      <div className="space-y-4 px-5 py-5">
        {trendingMenus.slice(0, 3).map((item) => (
          <div key={item[0]} className="flex gap-3 rounded-lg bg-white/10 p-3">
            <img src={item[3]} alt="" className="size-16 rounded-md object-cover" />
            <div className="flex-1"><p className="text-sm font-bold">{item[0]}</p><p className="mt-2 text-xs">{item[1]} x1</p></div>
            <div className="text-sm">+ -</div>
          </div>
        ))}
      </div>
      <div className="mt-2 rounded-t-[28px] bg-white px-5 py-6 text-[#191919]">
        <label className="block text-xs text-[#777]">Delivery Address</label>
        <div className="mt-2 rounded-md bg-[#f4f4f4] p-4 text-xs">2118 Thornridge Cir. Syracuse...</div>
        <div className="mt-5 flex justify-between text-sm"><span>Total</span><b>$360</b></div>
        <button className="mt-5 h-12 w-full rounded-md bg-[#8D0606] text-sm font-semibold text-white" onClick={() => setScreen("payment")} type="button">PLACE ORDER</button>
      </div>
    </div>
  );
}

function MobilePayment({ setScreen }) {
  return (
    <div className="min-h-[760px] bg-white">
      <MobileHeader setScreen={setScreen} title="Payment" />
      <div className="px-6 py-8 text-center">
        <div className="mx-auto mb-6 grid h-24 w-56 place-items-center rounded-lg border border-[#eee] text-lg font-semibold text-[#8D0606]">VISA&nbsp; MasterCard</div>
        <p className="text-sm font-bold">No master card added</p>
        <p className="mx-auto mt-2 max-w-[240px] text-xs leading-5 text-[#888]">You can add a card and save it for later checkout.</p>
        <button className="mt-6 h-11 w-full rounded-md border border-[#8D0606] text-sm font-bold text-[#8D0606]" type="button">ADD NEW</button>
        <div className="mt-12 flex justify-between text-sm"><span>Total</span><b>$360</b></div>
        <button className="mt-5 h-12 w-full rounded-md bg-[#8D0606] text-sm font-semibold text-white" onClick={() => setScreen("success")} type="button">PAY & CONFIRM</button>
      </div>
    </div>
  );
}

function MobileSuccess({ setScreen }) {
  return (
    <div className="flex min-h-[760px] flex-col justify-between bg-white px-8 py-12 text-center">
      <div />
      <div>
        <div className="mx-auto grid size-40 place-items-center rounded-full bg-[#fff3dc] text-7xl">🎉</div>
        <h1 className="mt-10 text-xl font-semibold">Congratulations</h1>
        <p className="mt-3 text-xs leading-5 text-[#888]">You successfully placed a payment. Enjoy your order.</p>
      </div>
      <button className="h-12 rounded-md bg-[#8D0606] text-sm font-semibold text-white" onClick={() => setScreen("track")} type="button">TRACK ORDER</button>
    </div>
  );
}

function MobileTrack({ setScreen }) {
  return (
    <div className="min-h-[760px] bg-white">
      <MobileHeader setScreen={setScreen} title="Track Order" />
      <div className="mx-5 mt-4 h-[420px] rounded-lg bg-[#dce8ef] p-4">
        <div className="h-full rounded-lg bg-[linear-gradient(45deg,#c9dce8_25%,transparent_25%),linear-gradient(-45deg,#c9dce8_25%,transparent_25%)] bg-[length:48px_48px]" />
      </div>
      <div className="mx-5 -mt-12 rounded-lg bg-white p-4 shadow-lg">
        <img src={foodImages[3]} alt="" className="float-left mr-3 size-16 rounded-md object-cover" />
        <p className="text-sm font-semibold">Main Course</p>
        <p className="text-xs text-[#777]">Arrives at 09:30 PM, 10 July</p>
      </div>
      <MobileBottomNav setScreen={setScreen} active="track" />
    </div>
  );
}

function MobileChat({ setScreen }) {
  return (
    <div className="min-h-[760px] bg-white">
      <MobileHeader setScreen={setScreen} title="Robert Fox" />
      <div className="space-y-4 px-5 py-8">
        {["Hi, Congratulations for order", "Your Pizza is on the way", "I'm coming, just wait..."].map((msg, i) => (
          <p key={msg} className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm ${i === 1 ? "ml-auto bg-orange-400 text-white" : "bg-[#f3f3f3]"}`}>{msg}</p>
        ))}
      </div>
      <div className="mx-5 mt-40 flex rounded-full bg-[#f4f4f4] p-2"><input className="flex-1 bg-transparent px-3 text-sm outline-none" placeholder="Write message" /><button className="grid size-10 place-items-center rounded-full bg-orange-400 text-white" type="button">➤</button></div>
    </div>
  );
}

function MobileProfile({ setScreen, onLogout }) {
  const logout = () => {
    onLogout?.();
    setScreen("login");
  };

  return (
    <div className="min-h-[760px] bg-white">
      <MobileHeader setScreen={setScreen} title="Edit Profile" />
      <div className="rounded-b-[28px] bg-[#8D0606] px-8 py-9 text-center text-white">
        <div className="mx-auto grid size-24 place-items-center rounded-full bg-orange-300"><UserRound size={60} fill="currentColor" /></div>
      </div>
      <div className="space-y-4 px-7 py-8">
        <MobileInput label="Name" placeholder="John Doe" />
        <MobileInput label="Email" placeholder="demo@gmail.com" />
        <MobileInput label="Phone Number" placeholder="+2457890" />
        <MobileInput label="Bio" placeholder="I love fast food" />
        <button className="h-12 w-full rounded-md bg-[#8D0606] text-sm font-semibold text-white" type="button">SAVE</button>
        <button className="h-12 w-full rounded-md bg-[#fff1f1] text-sm font-semibold text-[#8D0606]" onClick={logout} type="button">LOGOUT</button>
      </div>
    </div>
  );
}

function MobileFilter({ setScreen }) {
  return (
    <div className="min-h-[760px] bg-[#575757] px-6 py-8">
      <div className="ml-auto min-h-[690px] max-w-[300px] rounded-md bg-white p-5">
        <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Filter your search</h2><button className="grid size-7 place-items-center rounded-full bg-[#8D0606] text-white" onClick={() => setScreen("home")} type="button">×</button></div>
        <FilterGroup title="Offers" items={["Delivery", "Pick Up", "Offer"]} />
        <FilterGroup title="Delivery Time" items={["10-15 min", "20 min", "30 min"]} />
        <FilterGroup title="Pricing" items={["$", "$$", "$$$"]} />
        <div className="mt-6"><p className="mb-3 text-xs font-semibold">Rating</p><p className="text-[#ffc400]">★ ★ ★ ★ ☆</p></div>
        <button className="mt-10 h-11 w-full rounded-md bg-[#8D0606] text-xs font-semibold text-white" onClick={() => setScreen("home")} type="button">FILTER</button>
      </div>
    </div>
  );
}

function FilterGroup({ title, items }) {
  return (
    <div className="mt-6">
      <p className="mb-3 text-xs font-semibold">{title}</p>
      <div className="flex flex-wrap gap-2">{items.map((item, i) => <button key={item} className={`rounded-full px-3 py-2 text-xs ${i === 0 ? "bg-[#8D0606] text-white" : "bg-[#f4f4f4]"}`} type="button">{item}</button>)}</div>
    </div>
  );
}

function MobileBottomNav({ setScreen, active }) {
  return (
    <div className="fixed inset-x-0 bottom-4 mx-auto flex max-w-[390px] justify-center px-6">
      <div className="flex gap-2 rounded-full bg-white/95 p-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
        {[["home", Home], ["cart", ShoppingBag], ["track", Truck], ["chat", MessageSquareText], ["profile", UserRound]].map(([name, Icon]) => (
          <button key={name} className={`grid size-10 place-items-center rounded-full ${active === name ? "bg-[#8D0606] text-white" : "text-[#777]"}`} onClick={() => setScreen(name)} type="button">
            <IconGraphic icon={Icon} size={18} />
          </button>
        ))}
      </div>
    </div>
  );
}

function Topbar({ title, apiState, onLogout, setPage, onToast, onLogin, refreshKitchenData }) {
  const [openPanel, setOpenPanel] = useState("");
  const [resetOpen, setResetOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [backendOpen, setBackendOpen] = useState(false);

  const panelItems = {
    notifications: ["New order #245888 received", "Low stock: Rice", "Branch Main updated"],
    messages: ["Rider: order picked up", "Customer asked for extra cheese", "Support ticket resolved"],
    gifts: ["15% burger campaign", "Free delivery coupon", "Weekend combo live"],
  };

  return (
    <header className="sticky top-0 z-20 flex h-[124px] items-center justify-between bg-white px-5 shadow-sm sm:px-8 lg:px-10">
      <div className="flex items-center gap-8">
        <button className="grid size-12 place-items-center rounded-md text-[#8D0606]" onClick={() => setMenuOpen((value) => !value)} type="button">
          <Menu size={32} />
        </button>
        <h1 className="text-[38px] font-semibold tracking-[-0.03em]">{title}</h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden items-center gap-5 md:flex">
          {topAlerts.map((alert, index) => {
            const key = ["notifications", "messages", "gifts"][index];
            return (
              <button key={alert.count} className="relative grid size-[58px] place-items-center rounded-full bg-[#f6f6f6]  transition hover:bg-[#fff1f1] " onClick={() => setOpenPanel(openPanel === key ? "" : key)} type="button">

                <img
                  src={alert.icon}
                  alt="bell"
                  width={20}
                  height={10}
                  style={{
                    filter: alert.purple
                      ? "brightness(0) saturate(100%) invert(14%) sepia(10%) saturate(1000%) hue-rotate(250deg)"
                      : "brightness(0) saturate(100%) invert(14%) sepia(10%) saturate(1000%) hue-rotate(250deg)"
                  }}
                />

                <span className={`absolute -top-1 right-0 grid size-6 place-items-center rounded-full text-xs font-bold text-white ${alert.purple ? "bg-[#37283e]" : "bg-[#8D0606]"}`}>
                  {alert.count}
                </span>
              </button>
            )
          })}
        </div>
        <div className="hidden h-16 w-px bg-[#b31317] md:block" />
        <div className="text-right">
          <p className="text-sm font-medium text-[#8D0606]">{apiState?.online ? "API Connected" : "Demo Mode"}</p>
          <button className="text-2xl font-bold" onClick={() => setOpenPanel(openPanel === "profile" ? "" : "profile")} type="button">
            {apiState?.kitchen?.kitchenName || "Admin"}
          </button>
        </div>
        <button className="grid size-[70px] place-items-center rounded-full bg-[#fff] text-white" onClick={() => setOpenPanel(openPanel === "profile" ? "" : "profile")} type="button">
          <img src="./assets/adminprofileicon.png" alt="" className="size-16 w-full h-full" />
        </button>
      </div>
      {menuOpen ? <QuickMenu setPage={setPage} onClose={() => setMenuOpen(false)} /> : null}
      {openPanel && openPanel !== "profile" ? (
        <HeaderPanel
          title={openPanel}
          items={panelItems[openPanel] || []}
          onClose={() => setOpenPanel("")}
          onAction={(target) => {
            setOpenPanel("");
            setPage(target);
          }}
        />
      ) : null}
      {openPanel === "profile" ? (
        <ProfilePanel
          apiState={apiState}
          onClose={() => setOpenPanel("")}
          onLogout={onLogout}
          onReset={() => {
            setOpenPanel("");
            setResetOpen(true);
          }}
          onBackend={() => {
            setOpenPanel("");
            setBackendOpen(true);
          }}
          setPage={setPage}
        />
      ) : null}
      {resetOpen ? <ResetPasswordModal onClose={() => setResetOpen(false)} onToast={onToast} /> : null}
      {backendOpen ? <BackendConnectionModal apiState={apiState} onLogin={onLogin} setPage={setPage} refreshKitchenData={refreshKitchenData} onClose={() => setBackendOpen(false)} /> : null}
    </header>
  );
}

function QuickMenu({ setPage, onClose }) {
  const links = ["Dashboard", "Analytics", "Order List", "Category", "Add Menu", "Customer List", "Customer Review", "Add / Edit Kitchen"];
  return (
    <div className="absolute left-[330px] top-24 z-40 w-[280px] rounded-xl bg-white p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
      <div className="mb-2 flex items-center justify-between px-2">
        <b>Quick Menu</b>
        <button onClick={onClose} type="button"><X size={18} /></button>
      </div>
      {links.map((link) => (
        <button key={link} className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left font-bold hover:bg-[#fff1f1] hover:text-[#8D0606]" onClick={() => { setPage(link); onClose(); }} type="button">
          {link}<ChevronRight size={16} />
        </button>
      ))}
    </div>
  );
}

function HeaderPanel({ title, items, onClose, onAction }) {
  return (
    <div className="absolute right-[260px] top-24 z-40 w-[330px] rounded-xl bg-white p-4 shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold capitalize">{title}</h3>
        <button onClick={onClose} type="button"><X size={18} /></button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <button key={item} className="w-full rounded-lg bg-[#f8f8f8] px-4 py-3 text-left text-sm font-semibold hover:bg-[#fff1f1]" onClick={() => onAction(index === 0 ? "Order List" : index === 1 ? "Category" : "Dashboard")} type="button">
            {item}
          </button>
        ))}
      </div>
      <button className="mt-3 w-full rounded-lg bg-[#8D0606] py-2 text-sm font-semibold text-white" onClick={() => onAction("Order List")} type="button">View All</button>
    </div>
  );
}

function ProfilePanel({ apiState, onClose, onLogout, onReset, onBackend, setPage }) {
  return (
    <div className="absolute right-10 top-24 z-40 w-[360px] rounded-xl bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex gap-3">
          <div className="grid size-14 place-items-center rounded-full bg-[#4aa0ef] text-white"><UserRound fill="currentColor" /></div>
          <div>
            <h3 className="text-lg font-semibold">{apiState?.kitchen?.kitchenName || "Admin"}</h3>
            <p className="text-sm text-[#777]">{apiState?.kitchen?.email || "admin@cloudkitchen.test"}</p>
            <p className="text-xs font-bold text-[#8D0606]">{apiState?.token ? "Logged in" : "Demo user"}</p>
          </div>
        </div>
        <button onClick={onClose} type="button"><X size={18} /></button>
      </div>
      <div className="grid gap-2">
        <button className="rounded-lg bg-[#f8f8f8] px-4 py-3 text-left font-bold" onClick={() => setPage("Add / Edit Kitchen")} type="button">Edit Kitchen Profile</button>
        <button className="rounded-lg bg-[#f8f8f8] px-4 py-3 text-left font-bold" onClick={onBackend} type="button">Backend Connection</button>
        <button className="rounded-lg bg-[#f8f8f8] px-4 py-3 text-left font-bold" onClick={onReset} type="button">Reset Password</button>
        <button className="rounded-lg bg-[#f8f8f8] px-4 py-3 text-left font-bold" onClick={() => setPage("Table")} type="button">Account Data</button>
        <button className="rounded-lg bg-[#8D0606] px-4 py-3 text-left font-semibold text-white" onClick={onLogout} type="button">Logout</button>
      </div>
    </div>
  );
}

function ResetPasswordModal({ onClose, onToast }) {
  const [form, setForm] = useState({ token: "", password: "", confirmPassword: "" });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async () => {
    setBusy(true);
    setMessage("");
    try {
      await api.resetPassword(form);
      onToast?.("Password reset successful");
      onClose();
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Reset failed"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4">
      <div className="w-full max-w-[460px] rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Reset Password</h3>
          <button onClick={onClose} type="button"><X /></button>
        </div>
        <div className="space-y-3">
          <input className="h-12 w-full rounded-lg border px-4 outline-none" placeholder="Reset token" value={form.token} onChange={(e) => setForm((f) => ({ ...f, token: e.target.value }))} />
          <input className="h-12 w-full rounded-lg border px-4 outline-none" placeholder="New password" type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
          <input className="h-12 w-full rounded-lg border px-4 outline-none" placeholder="Confirm password" type="password" value={form.confirmPassword} onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))} />
        </div>
        {message ? <p className="mt-3 whitespace-pre-line text-sm font-bold text-[#8D0606]">{message}</p> : null}
        <button className="mt-5 h-12 w-full rounded-lg bg-[#8D0606] font-semibold text-white disabled:opacity-60" disabled={busy} onClick={submit} type="button">{busy ? "Saving..." : "Reset Password"}</button>
      </div>
    </div>
  );
}

function SetupFlowPage({ step, apiState, onLogout, onOnboardingCompleted, onPlanSelected }) {
  return (
    <main className="min-h-screen flex-1 bg-[#F7F6F6] px-6 py-7">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between rounded-md bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <img src="./assets/logo.png" alt="" className="size-14" />
          <div>
            <h1 className="text-2xl font-semibold text-[#8D0606]">Cloud Kitchen Setup</h1>
            <p className="text-sm text-[#777]">{apiState?.kitchen?.kitchenName || apiState?.kitchen?.email || "Complete your kitchen registration"}</p>
          </div>
        </div>
        <button className="rounded-full bg-[#fff1f1] px-5 py-2 font-bold text-[#8D0606]" onClick={onLogout} type="button">Logout</button>
      </div>

      <div className="mx-auto mt-7 grid max-w-[1180px] gap-7 lg:grid-cols-[300px_1fr]">
        <Card className="h-fit p-6">
          <div className="space-y-4">
            <SetupStep number="1" label="Onboarding" active={step === "onboarding"} done={isKitchenOnboardingCompleted(apiState?.kitchen)} />
            <SetupStep number="2" label="Subscription" active={step === "subscription"} done={hasSelectedSubscription(apiState)} />
            <SetupStep number="3" label="Ingredient Add" active={false} done={false} />
          </div>
        </Card>

        {step === "onboarding" ? (
          <OnboardingPage onComplete={onOnboardingCompleted} />
        ) : (
          <SubscriptionPlansPage plans={apiState?.plans || []} onPlanSelected={onPlanSelected} />
        )}
      </div>
    </main>
  );
}

function SetupStep({ number, label, active, done }) {
  return (
    <div className={`flex items-center gap-4 rounded-md border px-4 py-3 ${active ? "border-[#8D0606] bg-[#fff1f1]" : done ? "border-[#ccebd6] bg-[#f3fbf6]" : "border-[#ececec] bg-white"}`}>
      <span className={`grid size-9 place-items-center rounded-full text-sm font-bold ${done ? "bg-[#2fc65b] text-white" : active ? "bg-[#8D0606] text-white" : "bg-[#f3f3f3] text-[#777]"}`}>{done ? <Check size={18} /> : number}</span>
      <span className="font-semibold">{label}</span>
    </div>
  );
}

function OnboardingPage({ onComplete }) {
  const [form, setForm] = useState({ fssaiNumber: "", fssaiFile: null, gstNumber: "", gstFile: null });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const updateText = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const updateFile = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.files?.[0] || null }));

  const submit = async (event) => {
    event.preventDefault();
    if (!form.fssaiNumber || !form.fssaiFile || !form.gstNumber || !form.gstFile) {
      setMessage("FSSAI number, FSSAI file, GST number and GST file are required.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      await api.onboarding(form);
      await onComplete?.();
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Onboarding failed"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-8">
      <div className="mb-7">
        <h2 className="text-3xl font-semibold text-[#8D0606]">Onboarding</h2>
        <p className="mt-2 text-base text-[#777]">FSSAI and GST details are mandatory before kitchen setup can continue.</p>
      </div>
      <form className="grid gap-5" onSubmit={submit}>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="FSSAI Number *" placeholder="Enter FSSAI number" value={form.fssaiNumber} onChange={updateText("fssaiNumber")} />
          <FileField label="FSSAI File *" file={form.fssaiFile} onChange={updateFile("fssaiFile")} />
          <Field label="GST Number *" placeholder="Enter GST number" value={form.gstNumber} onChange={updateText("gstNumber")} />
          <FileField label="GST File *" file={form.gstFile} onChange={updateFile("gstFile")} />
        </div>
        {message ? <p className="whitespace-pre-line text-sm font-bold text-[#8D0606]">{message}</p> : null}
        <div className="flex justify-end">
          <button className="h-12 rounded-md bg-[#8D0606] px-8 font-semibold text-white disabled:opacity-60" disabled={saving} type="submit">
            {saving ? "Submitting..." : "Submit Onboarding"}
          </button>
        </div>
      </form>
    </Card>
  );
}

function FileField({ label, file, onChange }) {
  return (
    <label className="block">
      <span className="mb-3 block text-sm font-semibold">{label}</span>
      <span className="flex h-12 items-center gap-3 rounded border border-[#dce1e7] bg-white px-4">
        <Upload size={18} className="text-[#8D0606]" />
        <input className="min-w-0 flex-1 text-sm file:mr-4 file:rounded file:border-0 file:bg-[#fff1f1] file:px-3 file:py-1.5 file:font-bold file:text-[#8D0606]" type="file" onChange={onChange} />
      </span>
      {file ? <span className="mt-2 block text-xs font-semibold text-[#2f8f4e]">{file.name}</span> : null}
    </label>
  );
}

function SubscriptionPlansPage({ plans, onPlanSelected }) {
  const [planList, setPlanList] = useState(Array.isArray(plans) ? plans : []);
  const [selectedPlanId, setSelectedPlanId] = useState(planList[0]?.id ? String(planList[0].id) : "");
  const [billingCycle, setBillingCycle] = useState("MONTHLY");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadPlans() {
      setLoading(true);
      setMessage("");
      try {
        const response = await api.plans();
        const apiPlans = Array.isArray(response?.data) ? response.data : [];
        if (!active) return;
        setPlanList(apiPlans);
        setSelectedPlanId((current) => current || (apiPlans[0]?.id ? String(apiPlans[0].id) : ""));
      } catch (error) {
        if (active) setMessage(getApiErrorMessage(error, "Unable to load subscription plans"));
      } finally {
        if (active) setLoading(false);
      }
    }
    loadPlans();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(plans) && plans.length) {
      setPlanList(plans);
      setSelectedPlanId((current) => current || String(plans[0].id || ""));
    }
  }, [plans]);

  const selectPlan = async (plan) => {
    setSelectedPlanId(String(plan.id));
    setSaving(true);
    setMessage("");
    try {
      await api.selectPlan({
        subscriptionId: Number(plan.id),
        billingCycle: plan.billingCycle || billingCycle,
        duration: Number(plan.duration || plan.durationInMonths || 1),
      });
      await onPlanSelected?.({ ...plan, billingCycle: plan.billingCycle || billingCycle });
    } catch (error) {
      const messageText = getApiErrorMessage(error, "Unable to select subscription plan");
      if (messageText.toLowerCase().includes("active subscription already exists")) {
        await onPlanSelected?.({ ...plan, billingCycle: plan.billingCycle || billingCycle, alreadyActive: true });
        return;
      }
      setMessage(messageText);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-8">
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-[#8D0606]">Subscription Plans</h2>
          <p className="mt-2 text-base text-[#777]">Plans are loaded from the subscription listing API. Select one plan to continue.</p>
        </div>
        <div className="flex rounded-md border border-[#ececec] p-1 text-sm font-bold">
          {["MONTHLY", "YEARLY"].map((cycle) => (
            <button key={cycle} className={`rounded px-4 py-2 ${billingCycle === cycle ? "bg-[#8D0606] text-white" : "text-[#777]"}`} onClick={() => setBillingCycle(cycle)} type="button">{cycle}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="rounded-md border border-dashed border-[#d8d8d8] p-8 text-center text-[#777]">Loading subscription plans...</div>
      ) : planList.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {planList.map((plan) => {
            const active = String(plan.id) === selectedPlanId;
            return (
              <article key={plan.id || getPlanTitle(plan)} className={`rounded-md border bg-white p-6 shadow-sm ${active ? "border-[#8D0606]" : "border-[#ececec]"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{getPlanTitle(plan)}</h3>
                    <p className="mt-2 text-2xl font-bold text-[#8D0606]">{getPlanPrice(plan)}</p>
                  </div>
                  {active ? <span className="rounded-full bg-[#fff1f1] px-3 py-1 text-xs font-bold text-[#8D0606]">Selected</span> : null}
                </div>
                <p className="mt-4 min-h-[48px] text-sm leading-6 text-[#777]">{plan.description || plan.shortDescription || "Kitchen subscription plan"}</p>
                <div className="mt-5 grid gap-2 text-sm text-[#555]">
                  <span>Duration: {plan.duration || plan.durationInMonths || 1}</span>
                  <span>Cycle: {plan.billingCycle || billingCycle}</span>
                  <span>Status: {plan.status || "Available"}</span>
                </div>
                <button className="mt-6 h-11 w-full rounded-md bg-[#8D0606] font-semibold text-white disabled:opacity-60" disabled={saving} onClick={() => selectPlan(plan)} type="button">
                  {saving && active ? "Selecting..." : "Select Plan"}
                </button>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-md border border-dashed border-[#d8d8d8] p-8 text-center text-[#777]">No subscription plans returned from API.</div>
      )}
      {message ? <p className="mt-5 whitespace-pre-line text-sm font-bold text-[#8D0606]">{message}</p> : null}
    </Card>
  );
}

function IngredientSetupPage({ apiState, refreshKitchenData, selectedPlan }) {
  const branchOptions = apiState?.branches?.map((branch) => ({ value: branch.id, label: branch.name || `Branch ${branch.id}` })) || [];
  const firstBranchId = branchOptions[0]?.value ? String(branchOptions[0].value) : "";
  const [form, setForm] = useState({ branchId: firstBranchId, ingredientId: "", unit: "KG", name: "", category: "", image: "" });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const updateForm = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  useEffect(() => {
    setForm((current) => ({ ...current, branchId: current.branchId || firstBranchId }));
  }, [firstBranchId]);

  const addMasterIngredient = async (ingredient) => {
    if (!form.branchId) {
      setMessage("Create a branch first, then add ingredients to it.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      await api.createBranchIngredients(form.branchId, { ingredients: [{ id: Number(ingredient.id), unit: ingredient.unit || form.unit || "KG" }] });
      await refreshKitchenData?.();
      setMessage(`${ingredient.name || "Ingredient"} added to branch.`);
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Unable to add ingredient"));
    } finally {
      setSaving(false);
    }
  };

  const submitManual = async (event) => {
    event.preventDefault();
    if (!form.branchId) {
      setMessage("Create a branch first, then add ingredients to it.");
      return;
    }
    if (!form.ingredientId && !form.name) {
      setMessage("Select a master ingredient or enter a manual ingredient name.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      const ingredient = form.ingredientId
        ? { id: Number(form.ingredientId), unit: form.unit || "KG" }
        : { name: form.name, category: form.category || "General", image: form.image || "", unit: form.unit || "KG" };
      await api.createBranchIngredients(form.branchId, { ingredients: [ingredient] });
      await refreshKitchenData?.();
      setMessage("Ingredient saved successfully.");
      setForm((current) => ({ ...current, ingredientId: "", name: "", category: "", image: "" }));
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Unable to save ingredient"));
    } finally {
      setSaving(false);
    }
  };

  const ingredientOptions = apiState?.ingredients?.map((ingredient) => ({ value: ingredient.id, label: ingredient.name || `Ingredient ${ingredient.id}` })) || [];

  return (
    <div className="mx-auto max-w-[1180px] space-y-7">
      <div className="grid gap-5 md:grid-cols-3">
        <ApiCount label="Selected Plan" value={selectedPlan ? getPlanTitle(selectedPlan) : "Active"} />
        <ApiCount label="Master Data" value={apiState?.ingredients?.length || 0} />
        <ApiCount label="Branch Ingredients" value={apiState?.branchIngredients?.length || 0} />
      </div>

      <div className="grid gap-7 xl:grid-cols-[1fr_420px]">
        <Card className="overflow-hidden p-8">
          <CardTitle title="Master Data List" subtitle="Choose ingredients from master data and add them to the selected branch." />
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead className="text-sm text-[#8D0606]">
                <tr className="border-b border-[#ececec]">
                  <th className="py-3">Ingredient</th>
                  <th className="py-3">Category</th>
                  <th className="py-3">Unit</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {(apiState?.ingredients || []).map((ingredient) => (
                  <tr key={ingredient.id || ingredient.name} className="border-b border-[#f0f0f0]">
                    <td className="py-4 font-semibold">{ingredient.name || `Ingredient ${ingredient.id}`}</td>
                    <td className="py-4 text-[#777]">{ingredient.category || ingredient.categoryName || "General"}</td>
                    <td className="py-4 text-[#777]">{ingredient.unit || "KG"}</td>
                    <td className="py-4"><span className="rounded-full bg-[#e9f9ef] px-3 py-1 text-xs font-bold text-[#22a752]">{ingredient.status || "ACTIVE"}</span></td>
                    <td className="py-4 text-right">
                      <button className="rounded-md bg-[#fff1f1] px-4 py-2 text-sm font-bold text-[#8D0606] disabled:opacity-60" disabled={saving} onClick={() => addMasterIngredient(ingredient)} type="button">Add</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {apiState?.ingredients?.length ? null : <p className="py-8 text-center text-sm font-semibold text-[#777]">No master ingredients available.</p>}
          </div>
        </Card>

        <Card className="p-8">
          <CardTitle title="Manual Form" subtitle="Add a selected master ingredient or enter a custom ingredient." />
          <form className="mt-6 grid gap-4" onSubmit={submitManual}>
            <Field label="Branch" select value={form.branchId} onChange={updateForm("branchId")} options={branchOptions} placeholder={branchOptions.length ? "" : "No branch available"} />
            <Field label="Master Ingredient" select value={form.ingredientId} onChange={updateForm("ingredientId")} options={ingredientOptions} placeholder="Select from master data" />
            <Field label="Manual Ingredient Name" placeholder="Eg: Tomato" value={form.name} onChange={updateForm("name")} />
            <Field label="Category" placeholder="Eg: Vegetable" value={form.category} onChange={updateForm("category")} />
            <Field label="Unit" placeholder="KG" value={form.unit} onChange={updateForm("unit")} />
            <Field label="Image URL" placeholder="https://..." value={form.image} onChange={updateForm("image")} />
            <button className="h-12 rounded-md bg-[#8D0606] font-semibold text-white disabled:opacity-60" disabled={saving} type="submit">{saving ? "Saving..." : "Save Ingredient"}</button>
          </form>
          {message ? <p className="mt-4 whitespace-pre-line text-sm font-bold text-[#8D0606]">{message}</p> : null}
        </Card>
      </div>
    </div>
  );
}
function DashboardPage({ setPage, apiState }) {
  return (
    <div className="mx-auto max-w-[1320px] space-y-7">
      <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Menus" value="56" change="+4%" good icon={<img src="./assets/menuCup.svg" alt="Menus" className="w-10 h-10" />} />
        <MetricCard title="Orders" value="785" change="+2.7%" good icon={<img src="./assets/ordersicon.svg" alt="Orders" className="w-10 h-10" />} />
        <MetricCard title="Customers" value="56" change="-3%" icon={<img src="./assets/customersicon.svg" alt="Customers" className="w-10 h-10" />} />
        <MetricCard title="Income" value="$6231" change="-3.7%" icon={<img src="./assets/incomeicon.svg" alt="Income" className="w-10 h-10" />} />
      </div>

      <div className="grid gap-7 xl:grid-cols-2">
        <RevenueBars />
        <CustomerLine />
      </div>

      <div className="grid gap-7 xl:grid-cols-[1fr_400px]">
        <RecentOrders setPage={setPage} />
        <TrendingMenus setPage={setPage} />
      </div>
    </div>
  );
}

function BackendConnectionModal({ apiState, onLogin, setPage, refreshKitchenData, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/35">
      <div className="ml-auto flex h-full w-full max-w-[520px] flex-col bg-[#F7F6F6] shadow-[-18px_0_42px_rgba(0,0,0,0.18)]">
        <div className="flex shrink-0 items-center justify-between bg-white px-6 py-5 shadow-sm">
          <div>
            <h2 className="text-2xl font-semibold text-[#8D0606]">Backend Connection</h2>
            <p className="mt-1 text-sm text-[#777]">API login and setup actions.</p>
          </div>
          <button className="grid size-10 place-items-center rounded-full bg-[#8D0606] text-white" onClick={onClose} type="button">
            <X size={20} />
          </button>
        </div>
        <div className="sidebar-scroll min-h-0 flex-1 space-y-5 overflow-y-auto p-5">
          <ApiConnectionPanel apiState={apiState} onLogin={onLogin} setPage={setPage} compact />
          <KitchenApiActions apiState={apiState} setPage={setPage} refreshKitchenData={refreshKitchenData} compact />
        </div>
      </div>
    </div>
  );
}

function ApiConnectionPanel({ apiState, onLogin, setPage, compact = false }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      await onLogin(credentials);
      setMessage("Login successful. Live kitchen APIs connected.");
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Login failed"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="p-6">
      <div className={`grid gap-5 ${compact ? "" : "xl:grid-cols-[1fr_520px] xl:items-center"}`}>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className={`size-3 rounded-full ${apiState.online ? "bg-[#2fc65b]" : "bg-[#ff6868]"}`} />
            <h2 className="text-2xl font-semibold">Backend Connection</h2>
          </div>
          <p className="mt-2 text-sm text-[#777]">{apiState.message}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-[#f3f3f3] px-4 py-2 font-bold">Branches: {apiState.branches.length}</span>
            <span className="rounded-full bg-[#f3f3f3] px-4 py-2 font-bold">Menus: {apiState.menus.length}</span>
            <span className="rounded-full bg-[#f3f3f3] px-4 py-2 font-bold">Ingredients: {apiState.ingredients.length}</span>
          </div>
          <div className="mt-5 flex gap-3">
            <button className="rounded-full bg-[#8D0606] px-5 py-2 font-bold text-white" onClick={() => setPage("Add / Edit Kitchen")} type="button">Add Branch</button>
            <button className="rounded-full bg-[#fff1f1] px-5 py-2 font-bold text-[#8D0606]" onClick={() => setPage("Add Menu")} type="button">Add Menu</button>
          </div>
        </div>

        {!apiState.token ? (
          <form className={`grid gap-3 ${compact ? "" : "sm:grid-cols-[1fr_1fr_auto]"}`} onSubmit={submit}>
            <input className="h-12 rounded-lg border border-[#e2e2e2] px-4 outline-none" placeholder="Email / phone" value={credentials.username} onChange={(e) => setCredentials((c) => ({ ...c, username: e.target.value }))} />
            <input className="h-12 rounded-lg border border-[#e2e2e2] px-4 outline-none" placeholder="Password" type="password" value={credentials.password} onChange={(e) => setCredentials((c) => ({ ...c, password: e.target.value }))} />
            <button className="h-12 rounded-lg bg-[#8D0606] px-6 font-semibold text-white disabled:opacity-60" disabled={busy} type="submit">{busy ? "..." : "Login"}</button>
            {message ? <p className="whitespace-pre-line text-sm font-semibold text-[#8D0606] sm:col-span-3">{message}</p> : null}
          </form>
        ) : (
          <div className="rounded-lg bg-[#F7F6F6] p-5">
            <p className="text-sm text-[#777]">Logged in as</p>
            <p className="mt-1 text-xl font-semibold">{apiState.kitchen?.kitchenName || apiState.kitchen?.email || "Kitchen"}</p>
            <p className="mt-2 text-sm text-[#777]">Protected endpoints are now enabled when onboarding/subscription exists in DB.</p>
          </div>
        )}
      </div>
    </Card>
  );
}

function KitchenApiActions({ apiState, setPage, refreshKitchenData, compact = false }) {
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");

  const firstBranchId = apiState.branches[0]?.id;
  const firstIngredientId =
    apiState.branchIngredients[0]?.ingredientId ||
    apiState.branchIngredients[0]?.id ||
    apiState.ingredients[0]?.id ||
    1;
  const firstCuisineId = apiState.cuisines[0]?.id || 1;
  const firstPlanId = apiState.plans[0]?.id || 1;

  const run = async (label, action) => {
    if (!apiState.token) {
      setMessage("Login first to use kitchen APIs.");
      return;
    }
    setBusy(label);
    setMessage("");
    try {
      await action();
      await refreshKitchenData?.(undefined, null);
      setMessage(`${label} completed.`);
    } catch (error) {
      setMessage(getApiErrorMessage(error, `${label} failed`));
    } finally {
      setBusy("");
    }
  };

  const fakeFile = (name) => new File([new Blob(["demo"], { type: "text/plain" })], name, { type: "text/plain" });

  const actions = [
    {
      label: "Complete Onboarding",
      disabled: !apiState.token,
      onClick: () =>
        run("Complete Onboarding", () =>
          api.onboarding({
            fssaiNumber: "12345678901234",
            fssaiFile: fakeFile("fssai.txt"),
            gstNumber: "",
            gstFile: fakeFile("gst.txt"),
          })
        ),
    },
    {
      label: "Select Plan",
      disabled: !apiState.token,
      onClick: () =>
        run("Select Plan", () =>
          api.selectPlan({
            subscriptionId: Number(firstPlanId),
            billingCycle: "MONTHLY",
            duration: 1,
          })
        ),
    },
    {
      label: "Create Branch",
      disabled: !apiState.token,
      onClick: () =>
        run("Create Branch", () =>
          api.createBranch({
            name: `Main Branch ${Date.now().toString().slice(-4)}`,
            addressLine1: "Shop No 12, Ground Floor",
            pincode: "201301",
            countryId: 101,
            stateId: 4007,
            cityId: 57675,
            contactTitle: "MR",
            contactFirstName: "Rahul",
            contactEmail: "rahul@example.com",
            contactPhone: "9876543210",
            cuisines: [{ id: Number(firstCuisineId) }],
          })
        ),
    },
    {
      label: "Add Ingredients",
      disabled: !firstBranchId,
      onClick: () =>
        run("Add Ingredients", () =>
          api.createBranchIngredients(firstBranchId, {
            ingredients: apiState.ingredients.length
              ? apiState.ingredients.slice(0, 2).map((ingredient) => ({ id: Number(ingredient.id), unit: ingredient.unit || "KG" }))
              : [{ name: `Demo Tomato ${Date.now().toString().slice(-4)}`, category: "Vegetable", image: "https://cdn.example.com/ingredients/tomato.png", unit: "KG" }],
          })
        ),
    },
    {
      label: "Add Stock",
      disabled: !firstBranchId || !firstIngredientId,
      onClick: () =>
        run("Add Stock", () =>
          api.createStock(firstBranchId, {
            stocks: [{ id: Number(firstIngredientId), stock: 50, expireAt: "2026-12-31T00:00:00.000Z" }],
          })
        ),
    },
    {
      label: "Create Menu",
      disabled: !firstBranchId || !firstIngredientId,
      onClick: () =>
        run("Create Menu", () =>
          api.createMenu(firstBranchId, {
            name: `Paneer Butter Masala ${Date.now().toString().slice(-4)}`,
            description: "Creamy paneer curry with rich tomato gravy",
            price: 299,
            category: { name: "Veg." },
            subCategory: { name: "Paneer Specials" },
            ingredients: [{ id: Number(firstIngredientId), quantity: 0.5 }],
          })
        ),
    },
  ];

  return (
    <Card className="p-6">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Live API Setup</h2>
          <p className="mt-1 text-sm text-[#777]">Run backend flows in order: onboarding, plan, branch, ingredients, stock, menu.</p>
        </div>
        <button className="rounded-full bg-[#fff1f1] px-5 py-2 font-bold text-[#8D0606]" onClick={() => setPage("Category")} type="button">
          Open Menu
        </button>
      </div>
      <div className={`mb-5 grid gap-3 ${compact ? "grid-cols-2" : "sm:grid-cols-2 xl:grid-cols-5"}`}>
        <ApiCount label="Cuisines" value={apiState.cuisines.length} />
        <ApiCount label="Master Ingredients" value={apiState.ingredients.length} />
        <ApiCount label="Plans" value={apiState.plans.length} />
        <ApiCount label="Branches" value={apiState.branches.length} />
        <ApiCount label="Branch Ingredients" value={apiState.branchIngredients.length} />
        <ApiCount label="Menu Items" value={apiState.menus.length} />
      </div>
      <div className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className="rounded-lg bg-[#8D0606] px-4 py-3 text-sm font-semibold text-white disabled:bg-[#d7d7d7] disabled:text-[#777]"
            disabled={action.disabled || busy === action.label}
            onClick={action.onClick}
            type="button"
          >
            {busy === action.label ? "Working..." : action.label}
          </button>
        ))}
      </div>
      {message ? <p className="mt-4 whitespace-pre-line text-sm font-bold text-[#8D0606]">{message}</p> : null}
    </Card>
  );
}

function ApiCount({ label, value }) {
  return (
    <div className="rounded-lg bg-[#F7F6F6] px-4 py-3">
      <p className="text-xs font-bold uppercase text-[#8a8a8a]">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function AnalyticsPage({ setPage }) {
  return (
    <div className="mx-auto max-w-[1320px] space-y-7">
      <FavoritesPanel setPage={setPage} />
      <div className="grid gap-7 xl:grid-cols-[1fr_330px]">
        <SalesSummary />
        <LoyalCustomers setPage={setPage} />
      </div>
      <div className="grid gap-7 xl:grid-cols-[330px_1fr]">
        <CustomerBars />
        <RevenueArea />
      </div>
      <div className="grid gap-7 xl:grid-cols-[1fr_1fr]">
        <DailyTrendingList setPage={setPage} />
        <BestSellerMenus setPage={setPage} />
      </div>
    </div>
  );
}

function CustomerListPage({ setPage }) {
  return (
    <div className="mx-auto max-w-[1380px] space-y-10">
      <SearchFilterRow calendarTone="blue" />
      <OrderCustomerTable footerGap="mt-44" setPage={setPage} />
    </div>
  );
}

function CategoryPage({ setPage, liveMenuItems = [], apiState }) {
  const livePopular = liveMenuItems.length
    ? liveMenuItems.slice(0, 3).map((item) => [item.name, item.price, item.image, false])
    : popularDishes;
  const liveRecent = liveMenuItems.length
    ? liveMenuItems.slice(0, 3).map((item) => [item.name, item.price, "Live menu item", item.image])
    : recentCategoryOrders;

  return (
    <div className="mx-auto max-w-[1160px] space-y-12">
      <SearchFilterRow calendarTone="red" />

      <div className={`flex flex-col gap-3 rounded-lg px-5 py-3 text-sm font-bold md:flex-row md:items-center md:justify-between ${apiState?.menus?.length ? "bg-[#e9f9ef] text-[#16833b]" : "bg-[#fff8e7] text-[#9a6a00]"}`}>
        <span>
          {apiState?.menus?.length
            ? `Showing ${apiState.menus.length} menu item(s) from backend.`
            : "Demo menu shown. Login and add branch/menu in backend to replace it with live data."}
        </span>
        <button className="rounded-full bg-[#8D0606] px-5 py-2 text-white" onClick={() => setPage("Add Menu")} type="button">
          + Add Menu
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <ApiCount label="Branches" value={apiState?.branches?.length || 0} />
        <ApiCount label="Branch Ingredients" value={apiState?.branchIngredients?.length || 0} />
        <ApiCount label="Stocks" value={apiState?.stocks?.length || 0} />
        <ApiCount label="Menu Items" value={apiState?.menus?.length || 0} />
      </div>

      <CategorySection title="Popular Dishes" items={livePopular} type="popular" setPage={setPage} />
      <CategorySection title="Recent Order" items={liveRecent} type="recent" setPage={setPage} />

      <Card className="p-7 sm:p-9">
        <div className="grid gap-10 border-b border-[#e5e1e1] pb-10 xl:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="mb-4 text-[28px] font-bold text-[#333]">Your Balance</h2>
            <div className="flex max-w-[470px] items-center gap-8 rounded-[12px] bg-[#8D0606] px-8 py-8 text-white">
              <div className="rounded-[12px] bg-white px-6 py-5 text-[#333]">
                <p className="text-base text-[#666]">Balance</p>
                <p className="text-[34px] font-semibold">$12.000</p>
              </div>
              <BalanceAction icon={<CreditCard size={34} />} label="Top Up" />
              <BalanceAction icon={<Upload size={34} />} label="Transfer" />
            </div>
          </div>
          <div>
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#aaa1bd]">Your Address</h2>
                <p className="mt-4 flex items-center gap-3 text-xl font-bold text-[#3c3c3c]"><Globe2 className="text-[#8D0606]" /> Elm Street, 23</p>
              </div>
              <button className="rounded-md border border-[#8D0606] px-7 py-2 text-[#8D0606]" type="button">Change</button>
            </div>
            <p className="mb-6 max-w-[500px] text-base leading-7 text-[#aaa1bd]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            <div className="flex gap-5">
              <button className="rounded-md border border-[#b8b0c8] px-6 py-2 text-[#555]" type="button">Add Details</button>
              <button className="rounded-md border border-[#b8b0c8] px-6 py-2 text-[#555]" type="button">Add Note</button>
            </div>
          </div>
        </div>

        <div className="grid gap-10 pt-7 xl:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="mb-7 text-[28px] font-bold text-[#333]">Order Menu</h2>
            <div className="space-y-6">
              {orderMenu.map((item) => (
                <div key={item[0]} className="grid grid-cols-[82px_1fr_auto] items-center gap-5">
                  <img src={item[3]} alt="" className="size-[68px] rounded-full object-cover" />
                  <div>
                    <h3 className="text-xl font-bold text-[#444]">{item[0]}</h3>
                    <p className="text-[#8D0606]">{item[1]}</p>
                  </div>
                  <p className="text-lg font-bold text-[#3c3c3c]">{item[2]}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-8">
            <div className="mb-9 space-y-7 text-xl">
              <div className="flex justify-between"><span className="font-bold text-[#aaa1bd]">Service</span><b>+$1.00</b></div>
              <div className="flex justify-between"><span className="font-bold text-[#444]">Total</span><b>$202.00</b></div>
            </div>
            <button className="mb-8 flex h-[70px] w-full items-center justify-between rounded-[12px] border border-[#8D0606] px-8 text-xl font-bold text-[#444]" type="button">
              <span className="grid size-11 place-items-center rounded-lg bg-[#8D0606] text-white"><ReceiptText /></span>
              <span className="flex-1 text-center">Have a coupon code?</span>
              <ChevronRight />
            </button>
            <button className="h-[70px] w-full rounded-[12px] bg-[#8D0606] text-2xl font-bold text-white" onClick={() => setPage("Order")} type="button">Checkout</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function CustomerReviewPage() {
  return (
    <div className="mx-auto max-w-[1360px] space-y-12">
      <SearchFilterRow calendarTone="red" />

      <section>
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-[44px] font-semibold tracking-[-0.03em] text-[#8D0606]">Customer Review</h2>
            <p className="mt-4 text-[26px] font-bold text-[#796B6B]">Eum fuga consequuntur utadsjn et.</p>
          </div>
          <div className="hidden gap-5 md:flex">
            <button className="grid size-[68px] place-items-center rounded-[14px] bg-white text-[#8D0606]" type="button">
              <ChevronRight className="rotate-180" size={30} />
            </button>
            <button className="grid size-[68px] place-items-center rounded-[14px] bg-white text-[#8D0606]" type="button">
              <ChevronRight size={30} />
            </button>
          </div>
        </div>

        <div className="grid gap-9 xl:grid-cols-2">
          {reviewCards.map((review, index) => (
            <ReviewCard key={`${review[0]}-${index}`} review={review} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ReviewCard({ review, index }) {
  return (
    <article className="relative overflow-hidden rounded-[14px] bg-white p-8 shadow-[0_8px_18px_rgba(0,0,0,0.08)]">
      <div className="grid gap-6 md:grid-cols-[1fr_170px] md:items-center">
        <div className="min-w-0">
          <div className="flex gap-5">
            {review[3] ? (
              <img src={review[3]} alt="" className="size-[58px] shrink-0 rounded-full object-cover" />
            ) : (
              <div className="grid size-[58px] shrink-0 place-items-center rounded-full bg-[#eee7ff] text-orange-500">
                <UserRound size={34} fill="currentColor" />
              </div>
            )}
            <div>
              <h3 className="text-[28px] font-semibold leading-tight">{review[0]}</h3>
              <p className="mt-1 text-lg font-bold text-[#7a4b4d]">2 days ago</p>
            </div>
          </div>

          <p className="mt-7 text-[20px] font-semibold leading-8 text-[#464255]">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          </p>
          <div className="mt-7 flex items-center gap-4 text-[22px]">
            <span className="text-[#ffc400]">★ ★ ★ ★</span>
            <span className="text-[#cfd3d6]">★</span>
            <span className="ml-3 font-bold text-[#464255]">{review[1]}</span>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            src={review[2]}
            alt=""
            className="size-[170px] rounded-full object-cover shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
          />
        </div>
      </div>
    </article>
  );
}

function AddMenuPage({ setPage, apiState, refreshKitchenData }) {
  const firstBranchId = apiState?.branches?.[0]?.id ? String(apiState.branches[0].id) : "";
  const firstIngredientId =
    apiState?.branchIngredients?.[0]?.ingredientId ||
    apiState?.branchIngredients?.[0]?.ingredient?.id ||
    apiState?.ingredients?.[0]?.id ||
    "";
  const [form, setForm] = useState({
    branchId: firstBranchId,
    name: "",
    description: "",
    price: "",
    category: "Main Course",
    subCategory: "Chef Specials",
    ingredientId: firstIngredientId ? String(firstIngredientId) : "",
    quantity: "1",
    unit: "KG",
  });
  const [branchIngredients, setBranchIngredients] = useState(apiState?.branchIngredients || []);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const updateForm = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const branchOptions = apiState?.branches?.map((branch) => ({ value: branch.id, label: branch.name || `Branch ${branch.id}` })) || [];
  const inventoryOptions = branchIngredients.map((item) => ({
    value: item.ingredientId || item.ingredient?.id || item.id,
    label: item.ingredient?.name || item.name || `Ingredient ${item.ingredientId || item.id}`,
  }));
  const masterIngredientOptions = apiState?.ingredients?.map((ingredient) => ({ value: ingredient.id, label: ingredient.name || `Ingredient ${ingredient.id}` })) || [];
  const ingredientOptions = inventoryOptions.length ? inventoryOptions : masterIngredientOptions;
  const canSave = apiState?.token && form.branchId && form.name && form.price && form.ingredientId && form.quantity;

  useEffect(() => {
    setForm((current) => ({
      ...current,
      branchId: current.branchId || (apiState?.branches?.[0]?.id ? String(apiState.branches[0].id) : ""),
      ingredientId:
        current.ingredientId ||
        (apiState?.branchIngredients?.[0]?.ingredientId
          ? String(apiState.branchIngredients[0].ingredientId)
          : apiState?.branchIngredients?.[0]?.ingredient?.id
            ? String(apiState.branchIngredients[0].ingredient.id)
            : apiState?.ingredients?.[0]?.id
              ? String(apiState.ingredients[0].id)
              : ""),
    }));
    if (apiState?.branchIngredients?.length) {
      setBranchIngredients(apiState.branchIngredients);
    }
  }, [apiState?.branches, apiState?.branchIngredients, apiState?.ingredients]);

  useEffect(() => {
    if (!form.branchId) return;
    let active = true;
    async function loadBranchIngredients() {
      try {
        const response = await api.branchIngredients(form.branchId);
        const ingredients = Array.isArray(response?.data) ? response.data : [];
        if (!active) return;
        setBranchIngredients(ingredients);
        if (ingredients.length && !ingredients.some((item) => String(item.ingredientId || item.ingredient?.id || item.id) === String(form.ingredientId))) {
          setForm((current) => ({ ...current, ingredientId: String(ingredients[0].ingredientId || ingredients[0].ingredient?.id || ingredients[0].id) }));
        }
      } catch {
        if (active) setBranchIngredients([]);
      }
    }
    loadBranchIngredients();
    return () => {
      active = false;
    };
  }, [form.branchId]);

  const saveMenu = async () => {
    if (!apiState?.token) {
      setMessage("Login required before adding menu.");
      return;
    }
    if (!form.branchId) {
      setMessage("Create a branch first from Add / Edit Kitchen.");
      return;
    }
    if (!form.ingredientId) {
      setMessage("Add at least one master ingredient first.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      const ingredientExistsInBranch = branchIngredients.some((item) => String(item.ingredientId || item.ingredient?.id || item.id) === String(form.ingredientId));
      if (!ingredientExistsInBranch) {
        await api.createBranchIngredients(form.branchId, {
          ingredients: [{ id: Number(form.ingredientId), unit: form.unit || "KG" }],
        });
      }

      await api.createMenu(form.branchId, {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: { name: form.category || "Main Course" },
        subCategory: form.subCategory ? { name: form.subCategory } : undefined,
        ingredients: [{ id: Number(form.ingredientId), quantity: Number(form.quantity) }],
      });

      await refreshKitchenData?.();
      setMessage("Menu item created successfully.");
      setPage("Category");
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Unable to create menu item"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-[980px] space-y-7">
      <div className="flex flex-col gap-4 rounded-md bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#8D0606]">Add Menu</h2>
          <p className="text-base text-[#8d8d8d]">Create live menu items using branch inventory ingredients.</p>
        </div>
        <button className="rounded-full bg-[#fff1f1] px-5 py-2 font-bold text-[#8D0606]" onClick={() => setPage("Category")} type="button">
          View Foods
        </button>
      </div>

      <FormPanel title="Menu Details">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Branch" select value={form.branchId} onChange={updateForm("branchId")} options={branchOptions} placeholder={branchOptions.length ? "" : "No branch available"} />
          <Field label="Menu Name *" placeholder="Paneer Butter Masala" value={form.name} onChange={updateForm("name")} />
          <Field label="Price *" placeholder="299" type="number" value={form.price} onChange={updateForm("price")} />
          <Field label="Category" placeholder="Main Course" value={form.category} onChange={updateForm("category")} />
          <Field label="Sub Category" placeholder="Chef Specials" value={form.subCategory} onChange={updateForm("subCategory")} />
          <Field label="Ingredient" select value={form.ingredientId} onChange={updateForm("ingredientId")} options={ingredientOptions} placeholder={ingredientOptions.length ? "" : "No ingredient available"} />
          <Field label="Quantity Required" placeholder="1" type="number" value={form.quantity} onChange={updateForm("quantity")} />
          <Field label="Inventory Unit" placeholder="KG" value={form.unit} onChange={updateForm("unit")} />
          <Field label="Description" textarea className="md:col-span-2" placeholder="Describe this menu item" value={form.description} onChange={updateForm("description")} />
        </div>
      </FormPanel>

      <div className="grid gap-4 md:grid-cols-4">
        <ApiCount label="Branches" value={apiState?.branches?.length || 0} />
        <ApiCount label="Branch Ingredients" value={branchIngredients.length} />
        <ApiCount label="Master Ingredients" value={apiState?.ingredients?.length || 0} />
        <ApiCount label="Menu Items" value={apiState?.menus?.length || 0} />
      </div>

      <div className="flex justify-end gap-4">
        <button className="h-14 min-w-[170px] rounded-md bg-[#2fc65b] font-semibold text-white" onClick={() => setPage("Category")} type="button">Cancel</button>
        <button className="h-14 min-w-[170px] rounded-md bg-[#8D0606] font-semibold text-white disabled:opacity-60" disabled={saving || !canSave} onClick={saveMenu} type="button">
          {saving ? "Saving..." : "Save Menu"}
        </button>
      </div>
      {message ? <p className="whitespace-pre-line text-right text-sm font-bold text-[#8D0606]">{message}</p> : null}
    </div>
  );
}

function KitchenFormPage({ setPage, apiState, refreshKitchenData }) {
  const defaultCountryId = apiState?.countries?.[0]?.id ? String(apiState.countries[0].id) : "101";
  const kitchen = apiState?.kitchen || {};
  const branchList = apiState?.branches || [];
  const [selectedBranchId, setSelectedBranchId] = useState(branchList[0]?.id ? String(branchList[0].id) : "new");
  const selectedBranch = selectedBranchId === "new" ? null : branchList.find((branch) => String(branch.id) === String(selectedBranchId)) || null;
  const createBranchForm = (branch = null) => ({
    name: branch?.name || kitchen?.kitchenName || "",
    brand: kitchen?.kitchenName || "",
    addressLine1: branch?.addressLine1 || "",
    addressLine2: branch?.addressLine2 || "",
    landmark: branch?.landmark || "",
    area: branch?.area || "",
    pincode: branch?.pincode || "",
    countryId: branch?.countryId ? String(branch.countryId) : defaultCountryId,
    stateId: branch?.stateId ? String(branch.stateId) : "",
    cityId: branch?.cityId ? String(branch.cityId) : "",
    contactFirstName: branch?.contactFirstName || kitchen?.contactFirstName || "",
    contactLastName: branch?.contactLastName || kitchen?.contactLastName || "",
    contactEmail: branch?.contactEmail || kitchen?.contactEmail || kitchen?.email || "",
    contactPhone: branch?.contactPhone || kitchen?.contactPhone || kitchen?.phone || "",
    cuisineId: apiState?.cuisines?.[0]?.id ? String(apiState.cuisines[0].id) : "1",
  });
  const [form, setForm] = useState(() => createBranchForm(branchList[0] || null));
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [locationOptions, setLocationOptions] = useState({ states: [], cities: [], loading: false });
  const updateForm = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const cuisineOptions = apiState?.cuisines?.length
    ? apiState.cuisines.map((cuisine) => ({ value: cuisine.id, label: cuisine.name || cuisine.title || `Cuisine ${cuisine.id}` }))
    : [{ value: "1", label: "Cuisine #1" }];
  const countryOptions = apiState?.countries?.length
    ? apiState.countries.map((country) => ({ value: country.id, label: country.name || `Country ${country.id}` }))
    : [{ value: form.countryId, label: `Country #${form.countryId}` }];
  const stateOptions = locationOptions.states.length
    ? locationOptions.states.map((state) => ({ value: state.id, label: state.name || `State ${state.id}` }))
    : [{ value: form.stateId, label: `State #${form.stateId}` }];
  const cityOptions = locationOptions.cities.length
    ? locationOptions.cities.map((city) => ({ value: city.id, label: city.name || `City ${city.id}` }))
    : [{ value: form.cityId, label: `City #${form.cityId}` }];

  useEffect(() => {
    if (selectedBranchId !== "new" && !selectedBranch && branchList[0]?.id) {
      setSelectedBranchId(String(branchList[0].id));
    }
    if (selectedBranchId === "new" || selectedBranch) {
      setForm(createBranchForm(selectedBranch));
    }
  }, [selectedBranchId, selectedBranch?.id, apiState?.branches, apiState?.kitchen]);

  useEffect(() => {
    setForm((current) => ({
      ...current,
      countryId: current.countryId && current.countryId !== "101"
        ? current.countryId
        : apiState?.countries?.[0]?.id
          ? String(apiState.countries[0].id)
          : current.countryId,
      cuisineId: current.cuisineId && current.cuisineId !== "1"
        ? current.cuisineId
        : apiState?.cuisines?.[0]?.id
          ? String(apiState.cuisines[0].id)
          : current.cuisineId,
    }));
  }, [apiState?.countries, apiState?.cuisines]);

  useEffect(() => {
    let active = true;
    async function loadLocation() {
      if (!form.countryId) return;
      setLocationOptions((current) => ({ ...current, loading: true }));
      try {
        const statesResponse = await api.states({ countryId: form.countryId });
        const states = Array.isArray(statesResponse?.data) ? statesResponse.data : [];
        const selectedState = states.some((state) => String(state.id) === String(form.stateId)) ? form.stateId : states[0]?.id || form.stateId;
        const citiesResponse = await api.cities({ countryId: form.countryId, stateId: selectedState });
        const cities = Array.isArray(citiesResponse?.data) ? citiesResponse.data : [];
        if (!active) return;
        setLocationOptions({ states, cities, loading: false });
        setForm((current) => ({
          ...current,
          stateId: String(selectedState || current.stateId),
          cityId: cities.some((city) => String(city.id) === String(current.cityId)) ? current.cityId : String(cities[0]?.id || current.cityId),
        }));
      } catch {
        if (active) setLocationOptions((current) => ({ ...current, loading: false }));
      }
    }
    loadLocation();
    return () => {
      active = false;
    };
  }, [form.countryId]);

  useEffect(() => {
    let active = true;
    async function loadCities() {
      if (!form.countryId || !form.stateId) return;
      try {
        const citiesResponse = await api.cities({ countryId: form.countryId, stateId: form.stateId });
        const cities = Array.isArray(citiesResponse?.data) ? citiesResponse.data : [];
        if (!active) return;
        setLocationOptions((current) => ({ ...current, cities }));
        setForm((current) => ({
          ...current,
          cityId: cities.some((city) => String(city.id) === String(current.cityId)) ? current.cityId : String(cities[0]?.id || current.cityId),
        }));
      } catch {
        if (active) setLocationOptions((current) => ({ ...current, cities: [] }));
      }
    }
    loadCities();
    return () => {
      active = false;
    };
  }, [form.stateId]);

  const saveBranch = async () => {
    if (!apiState?.token) {
      setMessage("Login required before saving branch.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      if (!isKitchenOnboardingCompleted(apiState?.kitchen) || !hasSelectedSubscription(apiState)) {
        setMessage("Complete onboarding and select a subscription plan before saving branch.");
        setSaving(false);
        return;
      }
      const payload = {
        name: form.name,
        brand: form.brand,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        landmark: form.landmark,
        area: form.area,
        pincode: form.pincode,
        countryId: Number(form.countryId),
        stateId: Number(form.stateId),
        cityId: Number(form.cityId),
        contactTitle: "MR",
        contactFirstName: form.contactFirstName,
        contactLastName: form.contactLastName,
        contactEmail: form.contactEmail,
        contactPhone: form.contactPhone,
        cuisines: [{ id: Number(form.cuisineId) }],
      };
      if (selectedBranch?.id) {
        await api.updateBranch(selectedBranch.id, payload);
      } else {
        await api.createBranch(payload);
      }
      await refreshKitchenData?.();
      setMessage(selectedBranch?.id ? "Branch updated successfully." : "Branch saved successfully.");
      setPage("Category");
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Unable to save branch"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-[980px] space-y-7">
      <div className="flex items-center justify-between rounded-md bg-white px-5 py-4 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-[#8D0606]">{selectedBranch?.id ? "Edit Branch" : "Add Branch"}</h2>
          <p className="text-base text-[#8d8d8d]">{apiState?.kitchen?.kitchenName || "Kitchen profile"}</p>
        </div>
        <div className="flex gap-7 text-lg">
          <span className="text-[#8d8d8d]">Branches</span>
          <b className="text-[#8D0606]">{apiState?.branches?.length || 0}</b>
        </div>
      </div>

      <FormPanel title="Branch Manager">
        <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
          <div className="space-y-3">
            <button
              className={`w-full rounded-lg px-4 py-3 text-left font-bold ${selectedBranchId === "new" ? "bg-[#8D0606] text-white" : "bg-[#fff1f1] text-[#8D0606]"}`}
              onClick={() => setSelectedBranchId("new")}
              type="button"
            >
              + Add New Branch
            </button>
            {branchList.map((branch) => (
              <button
                key={branch.id}
                className={`w-full rounded-lg px-4 py-3 text-left font-bold ${String(selectedBranchId) === String(branch.id) ? "bg-[#8D0606] text-white" : "bg-[#F7F6F6] text-[#444]"}`}
                onClick={() => setSelectedBranchId(String(branch.id))}
                type="button"
              >
                <span className="block">{branch.name || `Branch ${branch.id}`}</span>
                <span className="mt-1 block text-xs font-semibold opacity-75">{branch.area || branch.pincode || "No area added"}</span>
              </button>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <ApiCount label="Total Branches" value={branchList.length} />
            <ApiCount label="Mode" value={selectedBranch?.id ? "Edit" : "New"} />
            <ApiCount label="Cuisines" value={apiState?.cuisines?.length || 0} />
            <ApiCount label="Plans" value={apiState?.plans?.length || 0} />
          </div>
        </div>
      </FormPanel>

      <FormPanel title="Basic Details">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Branch / Kitchen Name *" placeholder="Enter branch name" value={form.name} onChange={updateForm("name")} />
          <Field label="Brand" placeholder="Brand name" value={form.brand} onChange={updateForm("brand")} />
          <Field label="Cuisine" select value={form.cuisineId} onChange={updateForm("cuisineId")} options={cuisineOptions} />
          <Field label="Area / Zone" placeholder="Eg: Andheri East" value={form.area} onChange={updateForm("area")} />
          <Field label="Full Address" textarea className="md:col-span-2" value={form.addressLine1} onChange={updateForm("addressLine1")} />
        </div>
      </FormPanel>

      <FormPanel title="Operational Info">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Opening Time" placeholder="--:--" icon="clock" />
          <Field label="Closing Time" placeholder="--:--" icon="clock" />
          <Field label="Prep Time (mins)" placeholder="Prep Time (mins)" type="number" />
          <Field label="Max Orders / Day" placeholder="Max Orders / Day" type="number" />
        </div>
      </FormPanel>

      <FormPanel title="Form Details">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="First Name" placeholder="Contact first name" value={form.contactFirstName} onChange={updateForm("contactFirstName")} />
          <Field label="Last Name" placeholder="Contact last name" value={form.contactLastName} onChange={updateForm("contactLastName")} />
          <Field label="Email address" placeholder="Email" value={form.contactEmail} onChange={updateForm("contactEmail")} />
          <Field label="Phone" placeholder="Phone" value={form.contactPhone} onChange={updateForm("contactPhone")} />
          <Field label="Country" select value={form.countryId} onChange={updateForm("countryId")} options={countryOptions} />
          <Field label="City" select value={form.cityId} onChange={updateForm("cityId")} options={cityOptions} />
          <div className="grid grid-cols-[120px_1fr] gap-7">
            <Field label="State" select value={form.stateId} onChange={updateForm("stateId")} options={stateOptions} />
            <Field label="Zip" placeholder="" value={form.pincode} onChange={updateForm("pincode")} />
          </div>
          <label className="flex items-end gap-3 pb-5 text-base text-[#8d8d8d]">
            <input type="checkbox" defaultChecked className="size-4 accent-[#2f80ed]" />
            Check me out
          </label>
        </div>
        <p className="mt-4 text-sm font-semibold text-[#8D0606]">
          {locationOptions.loading ? "Loading location data..." : "Country, state and city are loaded from database."}
        </p>
      </FormPanel>

      <FormPanel title="Status">
        <div className="grid gap-10 md:grid-cols-2">
          <StatusInput checked label="Kitchen Active" />
          <StatusInput label="Accepting Orders" />
        </div>
      </FormPanel>

      <FormPanel title="Integrations">
        <div className="mb-8 flex gap-28 text-base text-[#8d8d8d]">
          <label className="flex items-center gap-3"><input type="checkbox" defaultChecked className="size-4 accent-[#2f80ed]" /> Swiggy</label>
          <label className="flex items-center gap-3"><input type="checkbox" defaultChecked className="size-4 accent-[#2f80ed]" /> Zomato</label>
        </div>
        <input className="h-14 w-full rounded border border-[#dce1e7] px-5 text-base outline-none" placeholder="External Kitchen Code" />
      </FormPanel>

      <div className="flex justify-end gap-4 pt-2">
        <button className="h-14 min-w-[170px] rounded-md bg-[#2fc65b] font-semibold text-white" onClick={() => setPage("Dashboard")} type="button">Cancel</button>
        <button className="h-14 min-w-[170px] rounded-md bg-[#8D0606] font-semibold text-white disabled:opacity-60" disabled={saving} onClick={saveBranch} type="button">
          {saving ? "Saving..." : selectedBranch?.id ? "Update Branch" : "Save Branch"}
        </button>
      </div>
      {message ? <p className="whitespace-pre-line text-right text-sm font-bold text-[#8D0606]">{message}</p> : null}
    </div>
  );
}

function FormPanel({ title, children }) {
  return (
    <section className="overflow-hidden rounded-[10px] bg-white shadow-[0_5px_14px_rgba(0,0,0,0.06)]">
      <div className="border-b border-[#b90d12] px-8 py-5">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="p-8">{children}</div>
    </section>
  );
}

function Field({ label, placeholder, textarea, select, options = [], type = "text", className = "", icon, value, onChange }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-3 block text-sm font-semibold">{label}</span>
      <span className="relative block">
        {textarea ? (
          <textarea className="h-28 w-full resize-none rounded border border-[#dce1e7] px-4 py-3 outline-none" placeholder={placeholder} value={value} onChange={onChange} />
        ) : select ? (
          <select className="h-12 w-full appearance-none rounded border border-[#dce1e7] px-4 pr-10 outline-none" value={value} onChange={onChange}>
            {placeholder ? <option value="">{placeholder}</option> : null}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input className="h-12 w-full rounded border border-[#dce1e7] px-4 pr-10 outline-none placeholder:text-[#929aa4]" placeholder={placeholder} type={type} value={value} onChange={onChange} />
        )}
        {select ? <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#646464]" size={18} /> : null}
        {icon === "clock" ? <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#646464]">◔</span> : null}
      </span>
    </label>
  );
}

function StatusInput({ checked, label }) {
  return (
    <label className="flex items-center gap-6">
      <span className={`grid size-8 place-items-center rounded ${checked ? "bg-[#8D0606] text-white" : "bg-[#8D0606]"}`}>
        {checked ? <Check size={22} strokeWidth={4} /> : null}
      </span>
      <input className="h-12 flex-1 rounded border border-[#dce1e7] px-5 outline-none" placeholder={label} />
    </label>
  );
}

function SearchFilterRow({ calendarTone = "blue" }) {
  const redTone = calendarTone === "red";
  return (
    <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex h-[70px] max-w-[430px] items-center gap-5 rounded-full border border-[#e6e6e6] bg-white px-6 shadow-sm">
        <input className="min-w-0 flex-1 bg-transparent text-xl outline-none placeholder:text-[#111]" placeholder="Search here" />
        <Search size={34} strokeWidth={1.8} />
      </div>
      <button className="flex h-[80px] w-full max-w-[320px] items-center gap-5 rounded-[10px] bg-white px-5 text-left shadow-[0_6px_18px_rgba(0,0,0,0.06)]" type="button">
        <span className={`grid size-14 place-items-center rounded-2xl ${redTone ? "bg-[#8D0606] text-white" : "bg-[#e5f6ff] text-[#35a7df]"}`}>
          <CalendarDays size={32} />
        </span>
        <span className="flex-1">
          <span className="block text-[22px] font-bold text-[#4d5963]">Filter Periode</span>
          <span className="mt-1 block text-sm text-[#56616c]">17 April 2024 - 21 May 2024</span>
        </span>
        <ChevronDown className="text-[#8D0606]" size={25} />
      </button>
    </div>
  );
}

function CategorySection({ title, items, type, setPage }) {
  return (
    <section>
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-[29px] font-semibold text-[#333]">{title}</h2>
        <button className="flex items-center gap-5 text-xl text-[#8D0606]" onClick={() => setPage(type === "popular" ? "Category" : "Order List")} type="button">View all <ChevronRight /></button>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((item, index) => type === "popular" ? <PopularDishCard key={item[0]} item={item} index={index} setPage={setPage} /> : <RecentCategoryCard key={item[0]} item={item} setPage={setPage} />)}
      </div>
    </section>
  );
}

function PopularDishCard({ item, setPage }) {
  return (
    <article className="relative rounded-[10px] bg-white p-9 shadow-sm">
      <span className="absolute left-0 top-8 bg-[#f45c63] px-6 py-2 text-xl text-white">15% Off</span>
      <Heart className={`absolute right-8 top-9 ${item[3] ? "text-[#f45c63]" : "text-[#d8d8d8]"}`} size={29} fill="currentColor" />
      <img src={item[2]} alt="" className="mx-auto mt-5 h-[175px] w-full object-contain" />
      <div className="mt-8 text-[#ffc400] text-2xl">★ ★ ★ ★ ★</div>
      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-[28px] font-bold leading-8 text-[#333]">{item[0]}</h3>
          <p className="text-[30px] font-semibold text-[#333]"><span className="text-[#8D0606]">$</span>{item[1].replace("$", "")}</p>
        </div>
        <button className="grid size-14 place-items-center rounded-md bg-[#8D0606] text-4xl leading-none text-white" onClick={() => setPage("Order")} type="button">+</button>
      </div>
    </article>
  );
}

function RecentCategoryCard({ item, setPage }) {
  return (
    <button className="relative rounded-[10px] bg-white p-9 text-center shadow-sm" onClick={() => setPage("Order")} type="button">
      <Heart className="absolute right-8 top-8 text-[#d8d8d8]" size={29} fill="currentColor" />
      <img src={item[3]} alt="" className="mx-auto h-[185px] w-full object-contain" />
      <h3 className="mt-6 text-xl font-bold text-[#333]">{item[0]}</h3>
      <p className="mt-5 text-[28px] font-semibold text-[#333]"><span className="text-[#8D0606]">$</span>{item[1].replace("$", "")}</p>
      <p className="mt-4 text-xl font-bold text-[#aaa1bd]">{item[2]}</p>
    </button>
  );
}

function BalanceAction({ icon, label }) {
  return (
    <div className="text-center">
      <div className="mx-auto grid size-[68px] place-items-center rounded-full bg-white text-[#555]">{icon}</div>
      <p className="mt-3 font-semibold">{label}</p>
    </div>
  );
}

function OrderListPage({ setPage }) {
  return (
    <div className="mx-auto max-w-[1380px] space-y-10">
      <SearchFilterRow calendarTone="blue" />
      <OrderCustomerTable footerGap="mt-44" setPage={setPage} />
    </div>
  );
}

function OrderCustomerTable({ footerGap = "mt-44", setPage }) {
  const [pageIndex, setPageIndex] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const rows = statusFilter === "All" ? orderListRows : orderListRows.filter((row) => row[6] === statusFilter);
  return (
    <Card className="overflow-hidden p-6 sm:p-8">
      <div className="mb-4 flex flex-wrap gap-3">
        {["All", "Delivery", "New Order", "On Delivery"].map((status) => (
          <button key={status} className={`rounded-full px-4 py-2 text-sm font-bold ${statusFilter === status ? "bg-[#8D0606] text-white" : "bg-[#f4f4f4]"}`} onClick={() => setStatusFilter(status)} type="button">{status}</button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1180px] border-collapse">
          <thead>
            <tr className="border-b-2 border-[#b90d12] text-left text-[20px] font-semibold text-[#91080c]">
              <th className="px-5 py-7">Order ID</th>
              <th className="px-5 py-7">Date</th>
              <th className="px-5 py-7">Customer Name</th>
              <th className="px-5 py-7">Location</th>
              <th className="px-5 py-7">Amount</th>
              <th className="px-5 py-7">Status Order</th>
              <th className="px-5 py-7" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="cursor-pointer border-b border-[#dfe3e7] text-[19px] transition hover:bg-[#fff7f7]" onClick={() => setPage("Order")}>
                <td className="px-5 py-[25px] font-semibold">{row[0]}</td>
                <td className="whitespace-nowrap px-5 py-[25px]">
                  {row[1]} <span className="ml-2 text-base text-[#8D0606]">{row[2]}</span>
                </td>
                <td className="px-5 py-[25px]">{row[3]}</td>
                <td className="px-5 py-[25px]">{row[4]}</td>
                <td className="px-5 py-[25px] font-semibold">{row[5]}</td>
                <td className="px-5 py-[25px]"><StatusPill status={row[6]} /></td>
                <td className="px-5 py-[25px] text-[#3768a2]"><MoreVertical size={24} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`${footerGap} flex flex-col gap-6 text-[19px] font-bold text-[#20324b] md:flex-row md:items-center md:justify-between`}>
        <p>Showing 1 to 10 of 11 entries</p>
        <div className="flex items-center gap-7 text-black">
          <button onClick={() => setPageIndex(1)} type="button">Previous</button>
          <button className={`grid size-12 place-items-center rounded ${pageIndex === 1 ? "bg-[#8D0606] text-white" : ""}`} onClick={() => setPageIndex(1)} type="button">1</button>
          <button className={`grid size-12 place-items-center rounded ${pageIndex === 2 ? "bg-[#8D0606] text-white" : ""}`} onClick={() => setPageIndex(2)} type="button">2</button>
          <button onClick={() => setPageIndex(2)} type="button">Next</button>
        </div>
      </div>
    </Card>
  );
}

function StatusPill({ status }) {
  const cls = status === "New Order" ? "bg-[#ffded1] text-[#fb6f3d]" : status === "On Delivery" ? "bg-[#fff3ce] text-[#f8ae00]" : "bg-[#cfe7ff] text-[#56a7ed]";
  return <span className={`inline-flex h-10 min-w-[132px] items-center justify-center rounded-full text-base font-bold ${cls}`}>{status}</span>;
}

function OrderPage({ setPage }) {
  return (
    <div className="mx-auto max-w-[980px] space-y-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <button className="mb-5 flex items-center gap-4 text-lg font-bold text-[#8D0606]" onClick={() => setPage("Order List")} type="button">
            <span className="text-3xl leading-none">←</span> Back
          </button>
          <h2 className="text-[28px] font-semibold">Order ID #5552351</h2>
          <p className="mt-3 text-lg font-bold">Orders <span className="mx-2 text-[#9b9b9b]">/</span><span className="text-[#8f8f8f]">Order Details</span></p>
        </div>
        <button className="inline-flex h-[58px] items-center gap-4 rounded-full bg-[#8D0606] px-9 text-base font-semibold text-white" type="button">
          <Truck size={22} /> ON DELIVERY
        </button>
      </div>

      <TimelineCard />
      <MapRouteCard />
      <DeliveryGuyCard />
      <OrderItemsTable />

      <div className="grid gap-7 xl:grid-cols-2">
        <CustomerProfileCard />
        <CustomerFavoritesCard />
      </div>
    </div>
  );
}

function TimelineCard() {
  const steps = [
    ["Order Created", "Thu, 21 Jul 2020, 11:49 AM", true],
    ["Payment Success", "Fri, 22 Jul 2020, 10:44 AM", true],
    ["On Delivery", "Sat, 23 Jul 2020, 01:24 PM", true],
    ["Order Delivered", "Sat, 23 Jul 2020, 01:24 PM", false],
  ];
  return (
    <Card className="p-10">
      <div className="relative grid gap-8 md:grid-cols-4">
        <div className="absolute left-7 right-7 top-[11px] hidden h-1 bg-[#3d4954] md:block" />
        <div className="absolute left-7 top-[11px] hidden h-1 w-[67%] bg-[#8D0606] md:block" />
        {steps.map((step) => (
          <div key={step[0]} className="relative z-10">
            <span className={`mb-5 block size-5 rounded-full ${step[2] ? "bg-[#8D0606]" : "bg-[#3d4954]"}`} />
            <h3 className="text-[19px] font-semibold text-[#474b68]">{step[0]}</h3>
            <p className="mt-3 text-sm text-[#a5a5a5]">{step[1]}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function MapRouteCard() {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card className={`p-7 ${expanded ? "fixed inset-8 z-50" : ""}`}>
      <div className="relative h-[300px] overflow-hidden rounded-[10px] bg-[#f1f1f1]">
        <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(45deg,transparent_44%,#dedede_45%,#dedede_55%,transparent_56%),linear-gradient(-45deg,transparent_44%,#e4e4e4_45%,#e4e4e4_55%,transparent_56%)] [background-size:180px_180px]" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 300" preserveAspectRatio="none">
          <path d="M90 60 L270 240 L360 150 L450 235 L560 75 L650 150 L725 60" fill="none" stroke="#c8c8c8" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M90 60 L270 240 L360 150" fill="none" stroke="#8D0606" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="absolute left-[83px] top-[52px] size-7 rounded-full bg-[#8D0606]" />
        <span className="absolute left-[350px] top-[138px] grid size-16 place-items-center rounded-full bg-[#8D0606] text-white shadow-xl"><Truck size={31} /></span>
        <span className="absolute left-[610px] top-[47px] grid size-14 place-items-center rounded-full bg-white text-orange-400 shadow-lg"><UserRound size={35} fill="currentColor" /></span>
        <span className="absolute left-[386px] top-[210px] rounded-md bg-white px-4 py-3 shadow-lg"><b>1-2 Min</b><br /><small className="text-[#999]">Estimated time</small></span>
        <button className="absolute bottom-7 right-7 grid size-12 place-items-center rounded-md bg-[#394653] text-white" onClick={() => setExpanded((value) => !value)} type="button">{expanded ? <X /> : <Expand />}</button>
      </div>
    </Card>
  );
}

function DeliveryGuyCard() {
  const [message, setMessage] = useState("");
  return (
    <Card className="grid gap-7 p-8 md:grid-cols-[1fr_auto_auto] md:items-center">
      <div className="flex items-center gap-6">
        <Avatar />
        <div>
          <p className="text-lg text-[#555]">Delivery guy</p>
          <h3 className="text-[26px] font-semibold">Rainold Hawkins</h3>
          <p className="mt-2 text-sm font-bold text-[#8D0606]">ID 412455</p>
        </div>
      </div>
      {message ? <p className="whitespace-pre-line rounded-lg bg-[#fff1f1] px-4 py-2 text-sm font-bold text-[#8D0606] md:col-span-3">{message}</p> : null}
      <button className="flex h-[76px] items-center gap-5 rounded-md bg-[#8D0606] px-7 text-left text-white" onClick={() => setMessage("Calling +12 345 5662 66...")} type="button">
        <Phone size={30} fill="currentColor" />
        <span><span className="block text-base">Telepon</span><span className="text-xl font-bold">+12 345 5662 66</span></span>
      </button>
      <button className="flex h-[76px] items-center gap-5 rounded-md bg-[#8D0606] px-7 text-left text-white" onClick={() => setMessage("Delivery reminder set for 12:52 AM")} type="button">
        <Truck size={30} />
        <span><span className="block text-base">Delivery Time</span><span className="text-xl font-bold">12:52 AM</span></span>
      </button>
    </Card>
  );
}

function Avatar() {
  return <div className="grid size-[88px] place-items-center rounded-full bg-[#2c7888] text-white"><UserRound size={58} fill="currentColor" /></div>;
}

function OrderItemsTable() {
  const [items, setItems] = useState(orderDetailItems);
  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-[1.8fr_90px_110px_140px_90px] border-b border-[#e2e5e8] px-6 py-6 text-xl font-semibold">
        <span>Items</span><span>Qty</span><span>Price</span><span>Total Price</span><span>Deleted</span>
      </div>
      {items.map((item) => (
        <div key={item[0]} className="grid grid-cols-[1.8fr_90px_110px_140px_90px] items-center border-b border-[#e7e8ec] px-6 py-5 last:border-0">
          <div className="flex gap-5">
            <img src={item[4]} alt="" className="size-[78px] rounded-sm object-cover" />
            <div>
              <p className="text-sm font-semibold uppercase text-[#8D0606]">Main Course</p>
              <h3 className="text-base font-bold">{item[0]}</h3>
              <p className="mt-3 text-sm text-[#697384]"><span className="text-[#ff9f00]">★ ★ ★</span> <span className="text-[#d9d9d9]">★ ★</span> <span className="ml-4">(454 revies)</span></p>
            </div>
          </div>
          <b className="text-lg">{item[1]}</b>
          <b className="text-lg text-[#3b2943]">{item[2]}</b>
          <b className="text-lg text-[#3b2943]">{item[3]}</b>
          <button className="grid size-10 place-items-center rounded bg-[#8D0606] text-white" onClick={() => setItems((current) => current.filter((row) => row[0] !== item[0]))} type="button"><X size={28} strokeWidth={4} /></button>
        </div>
      ))}
      {!items.length ? <p className="px-6 py-8 text-center font-bold text-[#8D0606]">All items removed.</p> : null}
    </Card>
  );
}

function CustomerProfileCard() {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-6 p-7">
        <Avatar />
        <div>
          <h3 className="text-[22px] font-semibold">James</h3>
          <span className="mt-3 inline-block rounded-md bg-[#f8e7e7] px-3 py-2 text-sm text-[#8D0606]">Customer</span>
        </div>
      </div>
      <div className="divide-y divide-[#eeeeee] border-t border-[#eeeeee] text-lg font-bold">
        <p className="flex items-center gap-7 px-8 py-6"><Phone /> +01234567890</p>
        <p className="flex items-center gap-7 px-8 py-6"><Globe2 /> Long Horn St. Avenue 000000 London</p>
        <div className="px-8 py-6">
          <h4 className="mb-6 text-xl font-semibold">Note Order</h4>
          <p className="text-lg font-normal leading-8 text-[#9a9a9a]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>
        </div>
      </div>
    </Card>
  );
}

function CustomerFavoritesCard() {
  return (
    <Card className="p-7">
      <h3 className="mb-7 text-xl font-semibold">Customer Favorites</h3>
      <div className="mb-7 border-t border-[#e7e7e7] pt-7">
        <svg className="mx-auto size-[190px]" viewBox="0 0 42 42">
          <circle r="15.915" cx="21" cy="21" fill="transparent" stroke="#ec4899" strokeWidth="11" strokeDasharray="34 66" strokeDashoffset="25" />
          <circle r="15.915" cx="21" cy="21" fill="transparent" stroke="#ffc96f" strokeWidth="11" strokeDasharray="33 67" strokeDashoffset="-9" />
          <circle r="15.915" cx="21" cy="21" fill="transparent" stroke="#7c3fed" strokeWidth="11" strokeDasharray="33 67" strokeDashoffset="-42" />
        </svg>
      </div>
      <FavoriteBar label="Pizza (40%)" value="25" color="#FFB800" width="82%" />
      <FavoriteBar label="Juice (35%)" value="60" color="#8D0606" width="61%" />
      <FavoriteBar label="Dessert (25%)" value="7" color="#3155df" width="25%" />
    </Card>
  );
}

function FavoriteBar({ label, value, color, width }) {
  return (
    <div className="mb-6">
      <div className="mb-3 flex justify-between text-base"><span>{label}</span><span className="text-[#999]">{value}</span></div>
      <div className="h-2 rounded-full bg-[#f0f0f0]"><div className="h-full rounded-full" style={{ backgroundColor: color, width }} /></div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return <section className={`premium-card rounded-[10px] bg-white shadow-[0_5px_14px_rgba(0,0,0,0.06)] ${className}`}>{children}</section>;
}

function CardTitle({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h2 className="text-[24px] font-bold tracking-[-0.02em]">{title}</h2>
        <p className="mt-1 text-[15px] text-[#9a9a9a]">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function SelectPill({ label = "Monthly", value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = value || label;
  return (
    <div className="relative">
      <button className="inline-flex h-12 min-w-[128px] items-center justify-center gap-3 rounded-full border border-[#ececec] bg-white text-[15px] font-bold" onClick={() => setOpen((v) => !v)} type="button">
        {selected}
        <ChevronDown size={17} className="text-[#ef4d8d]" />
      </button>
      {open ? (
        <div className="absolute right-0 top-14 z-20 w-36 rounded-xl bg-white p-2 shadow-xl">
          {["Monthly", "Weekly", "Today"].map((option) => (
            <button key={option} className={`w-full rounded-lg px-3 py-2 text-left text-sm font-bold ${selected === option ? "bg-[#8D0606] text-white" : "hover:bg-[#fff1f1]"}`} onClick={() => { onChange?.(option); setOpen(false); }} type="button">
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
function MetricCard({ title, value, change, good = false, icon, variant }) {
  return (
    <Card className="relative h-[200px] overflow-hidden p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(165,0,5,0.12)]">
      <div className="relative z-10">
        <p className="text-[32px] font-semibold">
          {value}{" "}
          <span className={good ? "text-[#2BC155]" : "text-[#ff6868]"}>
            {change}
          </span>
        </p>

        <div className="flex items-start justify-between">
          <p className="mt-4 text-[19px] font-medium">{title}</p>
          <div className="text-[#bd6466]">{icon}</div>
        </div>
      </div>

      <WaveFill variant={variant} />
    </Card>
  );
}

function WaveFill({ variant = 1 }) {
  const paths = {
    1: "M0 70 C20 26 38 70 58 42 C78 10 92 70 116 58 C134 48 150 75 169 43 C186 12 204 58 222 42 C240 22 256 76 276 25 C286 5 296 8 300 30 L300 90 L0 90 Z",

    2: "M0 55 C35 90 55 10 85 45 C110 75 135 15 165 50 C195 85 220 25 250 55 C270 75 290 40 300 20 L300 90 L0 90 Z",

    3: "M0 40 C30 15 60 85 90 40 C120 5 150 80 180 35 C210 10 240 90 270 30 C285 15 295 20 300 10 L300 90 L0 90 Z",

    4: "M0 65 C25 20 50 75 75 30 C100 5 130 80 160 40 C190 15 220 75 250 35 C275 10 290 50 300 25 L300 90 L0 90 Z",
  };

  return (
    <>
      <svg
        className="absolute bottom-0 left-0 h-[76px] w-full"
        viewBox="0 0 300 90"
        preserveAspectRatio="none"
      >
        <path d={paths[variant]} fill="#CDEFFC" />
      </svg>

      <div className="absolute bottom-0 left-0 right-0 h-4 bg-white/90 blur-md" />
    </>
  );
}

function RevenueBars() {
  const [period, setPeriod] = useState("Monthly");
  const chartData = {
    Monthly: { income: [31, 36, 55, 75, 51, 83, 106, 100, 49], expense: [22, 28, 48, 65, 35, 66, 96, 78, 42], labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"] },
    Weekly: { income: [42, 55, 61, 48, 72, 90, 67], expense: [25, 34, 40, 32, 58, 62, 51], labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
    Today: { income: [12, 22, 31, 28, 46, 58], expense: [8, 12, 19, 16, 24, 33], labels: ["8a", "10a", "12p", "2p", "4p", "6p"] },
  };
  const { income, expense, labels } = chartData[period];
  return (
    <Card className="p-8">
      <CardTitle title="Revenue" subtitle={`${period} performance`} action={<SelectPill value={period} onChange={setPeriod} />} />
      <div className="mb-8 flex justify-center gap-24 text-center">
        <div><p className="text-lg text-[#999]">Income</p><p className="text-[28px] font-semibold">$561,623</p></div>
        <div><p className="text-lg text-[#999]">Expense</p><p className="text-[28px] font-semibold">$126,621</p></div>
      </div>
      <BarChart income={income} expense={expense} labels={labels} max={120} />
    </Card>
  );
}

function BarChart({ income, expense, labels, max = 120 }) {
  return (
    <div className="relative h-[330px] px-2 pt-4">
      {[120, 90, 60, 30, 0].map((line) => (
        <div key={line} className="absolute left-0 right-0 flex items-center gap-4" style={{ bottom: `${(line / max) * 260 + 38}px` }}>
          <span className="w-8 text-right text-sm text-[#6f7a83]">{line}</span>
          <span className="h-px flex-1 bg-[#e7e7e7]" />
        </div>
      ))}
      <div className="absolute bottom-9 left-12 right-0 flex h-[260px] items-end justify-between">
        {income.map((value, index) => (
          <div key={labels[index]} className="flex h-full w-9 items-end justify-center gap-1">
            <span className="chart-bar w-[7px] rounded-t-full bg-[#69aee9]" style={{ height: `${(value / max) * 100}%` }} />
            <span className="chart-bar w-[7px] rounded-t-full bg-[#8D0606]" style={{ height: `${(expense[index] / max) * 100}%` }} />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-12 right-0 flex justify-between text-[15px] text-[#777]">
        {labels.map((label) => <span key={label}>{label}</span>)}
      </div>
    </div>
  );
}

function CustomerLine() {
  const [period, setPeriod] = useState("Monthly");
  return (
    <Card className="p-8">
      <CardTitle
        title="Customer Map"
        subtitle="Lorem ipsum dolor"
        action={
          <div className="flex h-12 rounded-full border border-[#ececec] p-1 text-[15px] font-bold text-[#8d8d8d]">
            {["Monthly", "Weekly", "Today"].map((option) => (
              <button key={option} className={`rounded-full px-6 py-2 ${period === option ? "bg-[#3d4650] text-white" : ""}`} onClick={() => setPeriod(option)} type="button">{option}</button>
            ))}
          </div>
        }
      />
      <LineChart period={period} />
    </Card>
  );
}

function LineChart({ period = "Monthly" }) {
  const redPath = period === "Today"
    ? "M0 220 C50 190 80 130 140 160 C210 200 235 90 300 110 C370 130 400 230 470 180 C510 145 540 130 560 140"
    : period === "Weekly"
      ? "M0 180 C55 120 105 240 168 170 C220 110 250 150 304 130 C380 92 410 226 470 190 C520 160 530 105 560 126"
      : "M0 210 C28 135 42 178 62 235 C88 272 130 140 176 128 C220 116 226 225 262 188 C306 142 338 112 384 178 C420 232 470 220 560 206";
  const bluePath = period === "Today"
    ? "M0 250 C80 210 110 230 170 180 C230 128 290 145 340 175 C410 220 470 198 560 170"
    : period === "Weekly"
      ? "M0 230 C70 190 105 210 158 178 C220 140 260 174 315 150 C380 120 425 170 560 150"
      : "M0 260 C50 205 85 240 134 210 C194 170 226 150 268 166 C324 190 312 238 382 230 C440 225 480 198 560 202";
  return (
    <div className="relative h-[360px]">
      {[90, 60, 30, 0, -30, -60].map((line) => (
        <div key={line} className="absolute left-0 right-0 flex items-center gap-4" style={{ top: `${28 + ((90 - line) / 150) * 260}px` }}>
          <span className="w-8 text-right text-sm text-[#8c8c8c]">{line}</span>
          <span className="h-px flex-1 bg-[#e8e8e8]" />
        </div>
      ))}
      <svg className="absolute left-12 right-0 top-12 h-[260px] w-[calc(100%-48px)]" viewBox="0 0 560 260" preserveAspectRatio="none">
        <path className="line-draw" d={redPath} fill="none" stroke={red} strokeWidth="5" strokeLinecap="round" />
        <path className="line-draw" d={bluePath} fill="none" stroke="#36a9e9" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <div className="absolute bottom-0 left-12 right-0 flex justify-between text-[15px] text-[#999]">
        {Array.from({ length: 20 }, (_, i) => String(i + 1).padStart(2, "0")).map((d) => <span key={d}>{d}</span>)}
      </div>
    </div>
  );
}

function RecentOrders({ setPage }) {
  return (
    <Card className="p-8">
      <CardTitle title="Recent Order Request" subtitle="Lorem ipsum dolor" action={<button className="h-12 rounded-full border border-[#ececec] px-9 text-base font-bold" type="button">Newest</button>} />
      <div className="divide-y divide-[#f0f0f0]">
        {orderRows.map((row) => <OrderRow key={`${row[1]}-${row[6]}-${row[4]}`} row={row} setPage={setPage} />)}
      </div>
      <button className="mx-auto mt-6 block text-lg font-bold text-[#8D0606]" onClick={() => setPage("Order List")} type="button">View More &gt;&gt;</button>
    </Card>
  );
}

function OrderRow({ row, setPage }) {
  const statusClass = row[5] === "DELIVERED" ? "bg-[#e5faec] text-[#37c766]" : row[5] === "CANCELED" ? "bg-[#fde4e4] text-[#ff6464]" : "bg-[#fff3d9] text-[#ffb31a]";
  return (
    <button className="grid w-full grid-cols-[86px_1.1fr_1.1fr_80px_60px_120px_28px] items-center gap-5 py-6 text-left transition hover:bg-[#fff7f7]" onClick={() => setPage("Order")} type="button">
      <img src={row[7]} alt="" className="size-[70px] rounded-sm object-cover" />
      <div>
        <h3 className="text-[19px] font-bold leading-6">{row[0]}</h3>
        <p className="mt-3 text-xl text-[#8D0606]">{row[6]}</p>
      </div>
      <div>
        <p className="text-xl font-bold">{row[1]}</p>
        <p className="mt-3 text-lg text-[#9a9a9a]">{row[2]}</p>
      </div>
      <p className="text-2xl font-semibold">{row[3]}</p>
      <p className="text-xl text-[#888]">{row[4]}</p>
      <span className={`rounded-lg px-4 py-3 text-center text-sm font-medium ${statusClass}`}>{row[5]}</span>
      <MoreVertical />
    </button>
  );
}

function TrendingMenus({ setPage }) {
  return (
    <Card className="p-8">
      <CardTitle title="Daily Trending Menus" subtitle="Lorem ipsum dolor" />
      <div className="divide-y divide-[#eeeeee]">
        {trendingMenus.map((item, index) => <TrendingItem key={item[0]} item={item} index={index} setPage={setPage} />)}
      </div>
    </Card>
  );
}

function TrendingItem({ item, index, setPage }) {
  return (
    <button className="flex w-full items-center gap-4 py-5 text-left transition hover:bg-[#fff7f7]" onClick={() => setPage("Category")} type="button">
      <div className="relative flex shrink-0 items-center gap-3">
        <span className="grid size-11 shrink-0 absolute left-[-20px] top-[-10px] place-items-center rounded-full bg-[#8D0606] text-xl font-semibold text-white">#{index + 1}</span>
        <img src={item[3]} alt="" className="size-16 rounded-md object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-[18px] font-semibold leading-6">{item[0]}</h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold">{item[1]}</span>
          <span className="text-base text-[#8e8e8e]">{item[2]}</span>
        </div>
      </div>
    </button>
  );
}

function FavoritesPanel({ setPage }) {
  const [activeTab, setActiveTab] = useState("All Categories");
  const visibleItems = activeTab === "All Categories" ? favoriteItems : favoriteItems.filter((item) => item[0].toLowerCase().includes(activeTab.toLowerCase().split(" ")[0]));
  return (
    <Card className="p-7">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-5">
        <CardTitle title="Most Favorites Items" subtitle="Lorem ipsum dolor sit amet, consectetur" />
        <div className="flex h-11 rounded-full border border-[#efefef] p-1 text-sm font-bold text-[#909090]">
          {["All Categories", "Main Course", "Pizza", "Drink", "Dessert", "More"].map((tab) => (
            <button key={tab} className={`rounded-full px-5 py-2 ${activeTab === tab ? "bg-[#8D0606] text-white" : ""}`} onClick={() => setActiveTab(tab)} type="button">{tab}</button>
          ))}
        </div>
      </div>
      <div className="divide-y divide-[#eeeeee]">
        {(visibleItems.length ? visibleItems : favoriteItems).map((item) => <FavoriteRow key={item[0]} item={item} />)}
      </div>
      <button className="mx-auto mt-6 block text-base font-bold text-[#8D0606]" onClick={() => setPage("Category")} type="button">View More &gt;&gt;</button>
    </Card>
  );
}

function FavoriteRow({ item }) {
  return (
    <div className="grid grid-cols-[100px_1.2fr_120px_110px_130px_90px] items-center gap-6 py-5">
      <img src={item[4]} alt="" className="size-[88px] rounded-md object-cover" />
      <div>
        <h3 className="text-lg font-bold leading-6">{item[0]}</h3>
        <p className="mt-2 text-sm text-[#8f8f8f]">
          <span className="text-[#ffa800]">★ ★ ★ ★</span> ★ <span className="ml-2">(454 revies)</span>
        </p>
        <p className="mt-2 text-sm font-bold text-[#8D0606]"><Heart className="mr-1 inline" size={17} fill="currentColor" />256kLike it</p>
      </div>
      <SparkLine />
      <div><p className="text-2xl font-semibold">{item[1]}</p><p className="text-base">Interest</p></div>
      <div><p className="text-2xl font-semibold text-[#222]"><BarChart3 className="mr-3 inline text-[#8D0606]" />{item[2]}</p><p className="text-base">Total Sales</p></div>
      <ProgressRing value={item[3]} />
    </div>
  );
}

function SparkLine() {
  return (
    <svg width="104" height="48" viewBox="0 0 104 48">
      <path d="M2 22 L12 31 L20 18 L29 27 L38 12 L47 32 L56 19 L64 37 L74 14 L84 29 L96 20 L102 28" fill="none" stroke={red} strokeWidth="4" />
    </svg>
  );
}

function ProgressRing({ value }) {
  const num = parseInt(value, 10);
  const dash = `${num} ${100 - num}`;
  return (
    <div className="relative grid size-[72px] place-items-center">
      <svg viewBox="0 0 36 36" className="size-[72px] -rotate-90">
        <path d="M18 2.5a15.5 15.5 0 1 1 0 31a15.5 15.5 0 0 1 0-31" fill="none" stroke="#ececec" strokeWidth="4" />
        <path d="M18 2.5a15.5 15.5 0 1 1 0 31a15.5 15.5 0 0 1 0-31" fill="none" stroke={red} strokeWidth="4" strokeDasharray={dash} strokeLinecap="round" />
      </svg>
      <span className="absolute text-sm font-semibold">{value}</span>
    </div>
  );
}

function SalesSummary() {
  return (
    <Card className="p-8">
      <CardTitle title="Sales Summary" subtitle="Lorem ipsum dolor sit amet,consecteture" action={<SelectPill />} />
      <div className="grid items-center gap-8 md:grid-cols-[220px_1fr]">
        <div className="space-y-8">
          <Legend color="#2BC155" value="63876" label="Menu Sold" />
          <Legend color="#FFB800" value="$873,335" label="Revenue" />
          <Legend color="#8D0606" value="$97,126" label="Safe(20%)" />
        </div>
        <div className="flex justify-center">
          <svg className="size-[250px]" viewBox="0 0 220 220">
            <circle cx="110" cy="110" r="78" fill="none" stroke="#eef3ff" strokeWidth="9" />
            <circle cx="110" cy="110" r="78" fill="none" stroke="#8D0606" strokeWidth="9" strokeDasharray="228 490" strokeLinecap="butt" transform="rotate(-90 110 110)" />
            <circle cx="110" cy="110" r="60" fill="none" stroke="#FFB800" strokeWidth="9" strokeDasharray="270 377" strokeLinecap="butt" transform="rotate(-90 110 110)" />
            <circle cx="110" cy="110" r="42" fill="none" stroke="#18b978" strokeWidth="9" strokeDasharray="225 264" strokeLinecap="butt" transform="rotate(-90 110 110)" />
          </svg>
        </div>
      </div>
    </Card>
  );
}

function Legend({ color, value, label }) {
  return (
    <div className="flex items-center gap-6">
      <span className="size-7 rounded-full" style={{ backgroundColor: color }} />
      <div><p className="text-xl font-semibold">{value}</p><p className="mt-1 text-sm text-[#aaa]">{label}</p></div>
    </div>
  );
}

function LoyalCustomers({ setPage }) {
  return (
    <Card className="p-8">
      <CardTitle title="Loyal Customers" subtitle="Lorem ipsum dolor" />
      <div className="space-y-6">
        {loyalCustomers.map((customer, index) => (
          <div key={customer[0]} className="flex items-center gap-5">
            <div className={`grid size-14 place-items-center rounded-md ${customer[2]}`}><UserRound size={35} /></div>
            <div><p className="font-bold">{customer[0]}</p><p className="mt-1 text-sm font-bold text-[#8D0606]">{customer[1]}</p></div>
          </div>
        ))}
      </div>
      <button className="mx-auto mt-9 block text-base font-bold text-[#8D0606]" onClick={() => setPage("Customer List")} type="button">View More &gt;&gt;</button>
    </Card>
  );
}

function CustomerBars() {
  const plus = [20, 40, 60, 35, 50, 70, 30];
  const minus = [28, 32, 10, 5, 35, 10, 30];
  return (
    <Card className="p-8">
      <CardTitle title="Customer Map" subtitle="Lorem ipsum dolor" />
      <div className="relative h-[300px]">
        {[-60, -30, 0, 30, 60, 90].map((line) => (
          <div key={line} className="absolute left-0 right-0 flex items-center gap-4" style={{ bottom: `${((line + 60) / 150) * 230 + 28}px` }}>
            <span className="w-8 text-right text-sm text-[#777]">{line}</span><span className="h-px flex-1 bg-[#e9e9e9]" />
          </div>
        ))}
        <div className="absolute bottom-[120px] left-12 right-0 h-px bg-[#d6d6d6]" />
        <div className="absolute bottom-[120px] left-12 right-0 flex justify-around">
          {plus.map((v, i) => (
            <div key={i} className="flex w-6 flex-col items-center">
              <span className="w-3 bg-[#8D0606]" style={{ height: v }} />
              <span className="w-3 bg-[#303b44]" style={{ height: minus[i] }} />
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-14 right-2 flex justify-between text-sm text-[#777]">{["4", "5", "6", "7", "8", "9", "10"].map((x) => <span key={x}>{x}</span>)}</div>
      </div>
    </Card>
  );
}

function RevenueArea() {
  return (
    <Card className="p-8">
      <CardTitle title="Revenue" subtitle="Lorem ipsum dolor" action={<SelectPill />} />
      <div className="relative h-[300px]">
        {[120, 100, 80, 60, 40, 20].map((line) => (
          <div key={line} className="absolute left-0 right-0 flex items-center gap-4" style={{ top: `${((120 - line) / 100) * 230}px` }}>
            <span className="w-8 text-right text-sm font-bold text-[#52616d]">{line}</span><span className="h-px flex-1 bg-[#eeeeee]" />
          </div>
        ))}
        <svg className="absolute bottom-8 left-12 h-[230px] w-[calc(100%-48px)]" viewBox="0 0 680 230" preserveAspectRatio="none">
          <path d="M0 112 C90 110 100 90 168 130 C242 174 250 74 328 70 C390 65 400 232 478 185 C534 150 520 16 604 22 C640 26 658 42 680 40 L680 230 L0 230 Z" fill="#8D0606" opacity="0.68" />
        </svg>
        <div className="absolute bottom-0 left-12 right-0 flex justify-between text-sm font-bold text-[#52616d]">{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"].map((m) => <span key={m}>{m}</span>)}</div>
      </div>
    </Card>
  );
}

function DailyTrendingList({ setPage }) {
  return (
    <Card className="p-8">
      <CardTitle title="Daily Trending Menus" subtitle="Lorem ipsum dolor" />
      <div className="divide-y divide-[#eeeeee]">{trendingMenus.map((item, index) => <TrendingItem key={item[0]} item={item} index={index} setPage={setPage} />)}</div>
    </Card>
  );
}

function BestSellerMenus({ setPage }) {
  return (
    <Card className="overflow-hidden p-8">
      <CardTitle title="Best seler menus" subtitle="Lorem ipsum dolor" />
      <div className="space-y-8">
        {[foodImages[1], foodImages[2]].map((img, index) => (
          <article key={img}>
            <img src={img} alt="" className="h-[210px] w-full rounded-md object-cover" />
            <h3 className="mt-4 text-lg font-bold">Medium Spicy Pizza with Kemangi Leaf</h3>
            <div className="mt-4 flex items-center justify-between text-lg font-semibold">
              <span>$6.53</span>
              <span><Heart className="mr-2 inline text-[#8D0606]" size={22} fill="currentColor" />256k</span>
              <span><BarChart3 className="mr-2 inline text-[#8D0606]" size={22} />6,723</span>
            </div>
          </article>
        ))}
      </div>
      <button className="mx-auto mt-9 block text-base font-bold text-[#ff3366]" onClick={() => setPage("Category")} type="button">View More &gt;&gt;</button>
    </Card>
  );
}

function UtilityPage({ title, subtitle, setPage }) {
  const actions = [
    ["Orders", OrderListPage, "Order List"],
    ["Menu", CategoryPage, "Category"],
    ["Reviews", CustomerReviewPage, "Customer Review"],
    ["Kitchen Form", KitchenFormPage, "Add / Edit Kitchen"],
  ];

  return (
    <div className="mx-auto max-w-[1180px] space-y-7">
      <Card className="p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[34px] font-semibold text-[#8D0606]">{title}</h2>
            <p className="mt-2 text-lg text-[#777]">{subtitle}</p>
          </div>
          <button className="rounded-full bg-[#8D0606] px-7 py-3 font-bold text-white" onClick={() => setPage("Dashboard")} type="button">
            Back to Dashboard
          </button>
        </div>
      </Card>

      {title === "Icons" ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[Bell, MessageSquareText, Gift, ShoppingBag, Truck, CreditCard, UserRound, ReceiptText].map((Icon, index) => (
            <Card key={index} className="icon-card p-7">
              <div className="icon-orb grid size-16 place-items-center rounded-xl bg-[#fff1f1] text-[#8D0606]">
                <IconGraphic icon={Icon} size={32} />
              </div>
              <h3 className="mt-5 text-xl font-semibold">Action {index + 1}</h3>
              <p className="mt-2 text-sm leading-6 text-[#777]">Reusable dashboard action icon for alerts, orders, billing and profile workflows.</p>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Quick Data Table</h3>
            <button className="rounded-full bg-[#fff1f1] px-5 py-2 font-bold text-[#8D0606]" onClick={() => setPage("Order List")} type="button">Open Orders</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead className="text-[#8D0606]">
                <tr className="border-b border-[#8D0606]">
                  <th className="py-4">Module</th>
                  <th className="py-4">Status</th>
                  <th className="py-4">Owner</th>
                  <th className="py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {actions.map(([label, , target]) => (
                  <tr key={label} className="border-b border-[#ececec]">
                    <td className="py-5 font-bold">{label}</td>
                    <td className="py-5"><span className="rounded-full bg-[#e9f9ef] px-4 py-2 text-sm font-bold text-[#22a752]">Ready</span></td>
                    <td className="py-5 text-[#777]">Cloud Kitchen</td>
                    <td className="py-5 text-right">
                      <button className="font-bold text-[#8D0606]" onClick={() => setPage(target)} type="button">Open</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2600);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex items-center gap-4 rounded-xl bg-[#191919] px-5 py-4 font-bold text-white shadow-xl">
      <span>{message}</span>
      <button className="text-white/70" onClick={onClose} type="button"><X size={18} /></button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
