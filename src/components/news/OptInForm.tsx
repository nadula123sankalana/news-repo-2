import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// API Configuration
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyM84s46deLIiHsHwCj9Ernaw3l5bSgCyk6F8LY_HzJ9ghhtHitYerahFEwIg40V_iQ/exec";
const DUPLICATE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzvknmC5O_QYxpg4YRWjCq6vbSTvpPmRfumEQ8h1MBrnQxEF1MMEfFckEdzRmJxUd0KCQ/exec";
const CRM_API_KEY =
  "b60f9-43e3d-f6315-f250d-c290c-68dbd-d98dd-5b20d-a9353-ad917";
const CRM_API_URL = `https://api.gl-mgt.com/leads/${CRM_API_KEY}`;

// Fixed values
const SID = " 086dcd7df73f4a7c0b5c51e1afab36e1 ";
const C_ID = 1;
const CID = 206183335;
const SOURCE = "News";
const LP = "news";

// Country codes mapping
const countryCodes = [
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+33", country: "FR" },
  { code: "+49", country: "DE" },
  { code: "+39", country: "IT" },
  { code: "+34", country: "ES" },
  { code: "+31", country: "NL" },
  { code: "+32", country: "BE" },
  { code: "+41", country: "CH" },
  { code: "+43", country: "AT" },
  { code: "+351", country: "PT" },
  { code: "+353", country: "IE" },
  { code: "+46", country: "SE" },
  { code: "+47", country: "NO" },
  { code: "+45", country: "DK" },
  { code: "+358", country: "FI" },
  { code: "+48", country: "PL" },
  { code: "+61", country: "AU" },
  { code: "+64", country: "NZ" },
  { code: "+81", country: "JP" },
  { code: "+82", country: "KR" },
  { code: "+86", country: "CN" },
  { code: "+91", country: "IN" },
  { code: "+55", country: "BR" },
  { code: "+52", country: "MX" },
  { code: "+971", country: "AE" },
];

interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag?: string;
  flagImage?: string;
}

// Get country flag emoji from country code (fallback)
const getCountryFlag = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

// Get country flag image URL
const getCountryFlagImage = (countryCode: string): string => {
  const code = countryCode.toLowerCase();
  return `https://flagcdn.com/w20/${code}.png`;
};

// Fallback country list (50+ countries)
const FALLBACK_COUNTRIES: Country[] = [
  {
    name: "United States",
    code: "US",
    dialCode: "+1",
    flag: getCountryFlag("US"),
    flagImage: getCountryFlagImage("US"),
  },
  {
    name: "United Kingdom",
    code: "GB",
    dialCode: "+44",
    flag: getCountryFlag("GB"),
    flagImage: getCountryFlagImage("GB"),
  },
  {
    name: "France",
    code: "FR",
    dialCode: "+33",
    flag: getCountryFlag("FR"),
    flagImage: getCountryFlagImage("FR"),
  },
  {
    name: "Germany",
    code: "DE",
    dialCode: "+49",
    flag: getCountryFlag("DE"),
    flagImage: getCountryFlagImage("DE"),
  },
  {
    name: "Italy",
    code: "IT",
    dialCode: "+39",
    flag: getCountryFlag("IT"),
    flagImage: getCountryFlagImage("IT"),
  },
  {
    name: "Spain",
    code: "ES",
    dialCode: "+34",
    flag: getCountryFlag("ES"),
    flagImage: getCountryFlagImage("ES"),
  },
  {
    name: "Netherlands",
    code: "NL",
    dialCode: "+31",
    flag: getCountryFlag("NL"),
    flagImage: getCountryFlagImage("NL"),
  },
  {
    name: "Belgium",
    code: "BE",
    dialCode: "+32",
    flag: getCountryFlag("BE"),
    flagImage: getCountryFlagImage("BE"),
  },
  {
    name: "Switzerland",
    code: "CH",
    dialCode: "+41",
    flag: getCountryFlag("CH"),
    flagImage: getCountryFlagImage("CH"),
  },
  {
    name: "Austria",
    code: "AT",
    dialCode: "+43",
    flag: getCountryFlag("AT"),
    flagImage: getCountryFlagImage("AT"),
  },
  {
    name: "Portugal",
    code: "PT",
    dialCode: "+351",
    flag: getCountryFlag("PT"),
    flagImage: getCountryFlagImage("PT"),
  },
  {
    name: "Ireland",
    code: "IE",
    dialCode: "+353",
    flag: getCountryFlag("IE"),
    flagImage: getCountryFlagImage("IE"),
  },
  {
    name: "Sweden",
    code: "SE",
    dialCode: "+46",
    flag: getCountryFlag("SE"),
    flagImage: getCountryFlagImage("SE"),
  },
  {
    name: "Norway",
    code: "NO",
    dialCode: "+47",
    flag: getCountryFlag("NO"),
    flagImage: getCountryFlagImage("NO"),
  },
  {
    name: "Denmark",
    code: "DK",
    dialCode: "+45",
    flag: getCountryFlag("DK"),
    flagImage: getCountryFlagImage("DK"),
  },
  {
    name: "Finland",
    code: "FI",
    dialCode: "+358",
    flag: getCountryFlag("FI"),
    flagImage: getCountryFlagImage("FI"),
  },
  {
    name: "Poland",
    code: "PL",
    dialCode: "+48",
    flag: getCountryFlag("PL"),
    flagImage: getCountryFlagImage("PL"),
  },
  {
    name: "Australia",
    code: "AU",
    dialCode: "+61",
    flag: getCountryFlag("AU"),
    flagImage: getCountryFlagImage("AU"),
  },
  {
    name: "New Zealand",
    code: "NZ",
    dialCode: "+64",
    flag: getCountryFlag("NZ"),
    flagImage: getCountryFlagImage("NZ"),
  },
  {
    name: "Japan",
    code: "JP",
    dialCode: "+81",
    flag: getCountryFlag("JP"),
    flagImage: getCountryFlagImage("JP"),
  },
  {
    name: "South Korea",
    code: "KR",
    dialCode: "+82",
    flag: getCountryFlag("KR"),
    flagImage: getCountryFlagImage("KR"),
  },
  {
    name: "China",
    code: "CN",
    dialCode: "+86",
    flag: getCountryFlag("CN"),
    flagImage: getCountryFlagImage("CN"),
  },
  {
    name: "India",
    code: "IN",
    dialCode: "+91",
    flag: getCountryFlag("IN"),
    flagImage: getCountryFlagImage("IN"),
  },
  {
    name: "Brazil",
    code: "BR",
    dialCode: "+55",
    flag: getCountryFlag("BR"),
    flagImage: getCountryFlagImage("BR"),
  },
  {
    name: "Mexico",
    code: "MX",
    dialCode: "+52",
    flag: getCountryFlag("MX"),
    flagImage: getCountryFlagImage("MX"),
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    dialCode: "+971",
    flag: getCountryFlag("AE"),
    flagImage: getCountryFlagImage("AE"),
  },
];

export function OptInForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    country?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [countryCode, setCountryCode] = useState("+33");
  const [selectedDialCode, setSelectedDialCode] = useState("+33");

  // IP and country detection state
  const [ip_user, setIp_user] = useState<string>("");
  const [pays_user, setPays_user] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countriesList, setCountriesList] = useState<Country[]>([]);

  // Fetch country list with caching (1 hour cache)
  const fetchCountryList = async (): Promise<Country[]> => {
    const cacheKey = "country_list_cache";
    const cache = localStorage.getItem(cacheKey);

    if (cache) {
      try {
        const { data, timestamp } = JSON.parse(cache);
        const now = Date.now();
        // Cache valid for 1 hour (3,600,000 ms)
        if (now - timestamp < 3600000) {
          setCountriesList(data);
          return data;
        }
      } catch (e) {
        // Cache parse error, continue to fetch
      }
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      // Using REST Countries API v3.1 - returns all countries
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,cca2,idd,flags",
        {
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`REST Countries API error: ${response.status}`);
      }

      const data = await response.json();
      console.log(
        "🌍 REST Countries API - Total countries fetched:",
        data.length
      );

      const countries: Country[] = data
        .map((country: any) => {
          // Extract dial code from country data
          let dialCode = "";
          if (country.idd?.root && country.idd?.suffixes?.length > 0) {
            dialCode = `${country.idd.root}${country.idd.suffixes[0]}`;
          } else if (country.idd?.root) {
            dialCode = country.idd.root;
          }

          const countryCode = country.cca2 || "";

          // Try to find dial code from our mapping if not found in API
          if (!dialCode) {
            const mappedCountry = countryCodes.find(
              (c) => c.country === countryCode
            );
            dialCode = mappedCountry?.code || "";
          }

          // Include ALL countries from the API
          return {
            name: country.name.common,
            code: countryCode,
            dialCode: dialCode || "+1", // Default to +1 if no dial code found
            flag: getCountryFlag(countryCode),
            flagImage: getCountryFlagImage(countryCode),
          };
        })
        .filter((c: Country) => c.code && c.name); // Only filter out invalid entries

      console.log("✅ Countries after filtering:", countries.length);
      console.log(
        "📋 Sample countries:",
        countries
          .slice(0, 5)
          .map((c) => `${c.name} (${c.code}) - ${c.dialCode}`)
      );

      // Cache the result
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          data: countries,
          timestamp: Date.now(),
        })
      );

      setCountriesList(countries);
      return countries;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Failed to fetch country list, using fallback:", error);
      }
      setCountriesList(FALLBACK_COUNTRIES);
      return FALLBACK_COUNTRIES;
    }
  };

  // Find country object by country code (case-insensitive)
  const findCountryByCode = (
    countryCode: string,
    countries: Country[]
  ): Country | null => {
    const codeUpper = countryCode.toUpperCase();
    return countries.find((c) => c.code.toUpperCase() === codeUpper) || null;
  };

  // Try primary IP service: ipapi.co
  const tryIpapiCo = async (): Promise<{
    country: Country | null;
    ip: string;
    countryCode: string;
  } | null> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch("https://ipapi.co/json/", {
        signal: controller.signal,
        mode: "cors",
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Response not ok");
      }

      const data = await response.json();
      const ip = data.ip || "";
      const countryCodeLower = (data.country_code || "fr").toLowerCase();
      const countryCodeUpper = countryCodeLower.toUpperCase();

      return {
        ip,
        countryCode: countryCodeUpper,
        country: null, // Will be set by caller
      };
    } catch (error: any) {
      // Silently handle errors
      const errorMsg = error?.message || "";
      if (
        !errorMsg.includes("aborted") &&
        !errorMsg.includes("Failed to fetch") &&
        !errorMsg.includes("NetworkError") &&
        process.env.NODE_ENV === "development"
      ) {
        console.warn("ipapi.co error:", error);
      }
      return null;
    }
  };

  // Try backup IP service: ipinfo.io
  const tryIpinfoIo = async (): Promise<{
    country: Country | null;
    ip: string;
    countryCode: string;
  } | null> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch("https://ipinfo.io/json", {
        signal: controller.signal,
        mode: "cors",
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Response not ok");
      }

      const data = await response.json();
      const ip = data.ip || "";
      const countryCodeLower = (data.country || "fr").toLowerCase();
      const countryCodeUpper = countryCodeLower.toUpperCase();

      return {
        ip,
        countryCode: countryCodeUpper,
        country: null, // Will be set by caller
      };
    } catch (error: any) {
      if (process.env.NODE_ENV === "development") {
        console.warn("ipinfo.io error:", error);
      }
      return null;
    }
  };

  // Detect country from IP with caching (as per documentation)
  const detectCountryFromIP = async (
    countries: Country[]
  ): Promise<{
    country: Country | null;
    ip: string;
    countryCode: string;
  }> => {
    const cacheKey = "ip_detection_cache";
    const cache = localStorage.getItem(cacheKey);

    // Check cache first
    if (cache) {
      try {
        const { ip, country, timestamp } = JSON.parse(cache);
        const now = Date.now();
        // Cache valid for 1 hour (3,600,000 ms)
        if (now - timestamp < 3600000) {
          const countryCodeUpper = country.toUpperCase();
          const countryObj = findCountryByCode(countryCodeUpper, countries);

          return {
            ip: ip || "",
            countryCode: countryCodeUpper,
            country: countryObj,
          };
        }
      } catch (e) {
        // Cache parse error, continue to fetch
      }
    }

    // Try primary service: ipapi.co
    const primaryResult = await tryIpapiCo();
    if (primaryResult) {
      const countryObj = findCountryByCode(
        primaryResult.countryCode,
        countries
      );

      // Cache the result
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          ip: primaryResult.ip,
          country: primaryResult.countryCode,
          timestamp: Date.now(),
        })
      );

      return {
        ip: primaryResult.ip,
        countryCode: primaryResult.countryCode,
        country: countryObj,
      };
    }

    // Try backup service: ipinfo.io
    const backupResult = await tryIpinfoIo();
    if (backupResult) {
      const countryObj = findCountryByCode(backupResult.countryCode, countries);

      // Cache the result
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          ip: backupResult.ip,
          country: backupResult.countryCode,
          timestamp: Date.now(),
        })
      );

      return {
        ip: backupResult.ip,
        countryCode: backupResult.countryCode,
        country: countryObj,
      };
    }

    // Fallback: Use default country (France)
    const fallbackCountryCode = "FR";
    const fallbackCountry =
      findCountryByCode(fallbackCountryCode, countries) ||
      FALLBACK_COUNTRIES.find((c) => c.code === fallbackCountryCode) ||
      null;

    return {
      ip: "",
      countryCode: fallbackCountryCode,
      country: fallbackCountry,
    };
  };

  // Initialize country list and detect IP on mount
  useEffect(() => {
    const initialize = async () => {
      // Step 1: Load country list first
      const countries = await fetchCountryList();
      setCountriesList(countries);

      // Step 2: Detect IP and country
      try {
        console.log("🔍 Starting IP detection...");
        const response = await fetch("https://ipinfo.io/json");
        if (!response.ok) throw new Error("Failed to fetch country data");
        const data = await response.json();

        console.log("📍 IP Detection Response:", {
          ip: data.ip,
          country: data.country,
          city: data.city,
          region: data.region,
        });

        // Store IP and country for tracking (no restrictions)
        const detectedCountryCode = (data.country || "").toUpperCase();
        setIp_user(data.ip || "");
        setPays_user(detectedCountryCode);

        console.log("🌐 Detected Country Code:", detectedCountryCode);
        console.log("💾 Stored IP:", data.ip || "");
        console.log("💾 Stored Country:", detectedCountryCode);

        // Step 3: Set selected country based on detected country code using REST Countries data
        if (detectedCountryCode && countries.length > 0) {
          // Find country in REST Countries API data
          const countryObj = countries.find(
            (c) => c.code.toUpperCase() === detectedCountryCode
          );
          if (countryObj) {
            console.log("✅ Found country in REST Countries API data:", {
              name: countryObj.name,
              code: countryObj.code,
              dialCode: countryObj.dialCode,
            });
            setSelectedCountry(countryObj);
            setSelectedDialCode(countryObj.dialCode);
            setCountryCode(countryObj.dialCode);
          } else {
            console.warn(
              "⚠️ Country not found in REST Countries API, trying fallback mapping..."
            );
            // If country not found in REST Countries API, try to find by country code mapping
            const fallbackCountry = countryCodes.find(
              (c) => c.country === detectedCountryCode
            );
            if (fallbackCountry) {
              console.log(
                "✅ Found country in fallback mapping:",
                fallbackCountry
              );
              const fallback: Country = {
                name: fallbackCountry.country,
                code: fallbackCountry.country.toUpperCase(),
                dialCode: fallbackCountry.code,
                flag: getCountryFlag(fallbackCountry.country),
                flagImage: getCountryFlagImage(fallbackCountry.country),
              };
              setSelectedCountry(fallback);
              setSelectedDialCode(fallbackCountry.code);
              setCountryCode(fallbackCountry.code);
            } else {
              console.warn(
                "❌ Country not found in any mapping:",
                detectedCountryCode
              );
              // Try to fetch country directly from REST Countries API by code
              try {
                console.log(
                  "🔄 Attempting to fetch country from REST Countries API by code:",
                  detectedCountryCode
                );
                const countryResponse = await fetch(
                  `https://restcountries.com/v3.1/alpha/${detectedCountryCode.toLowerCase()}?fields=name,cca2,idd,flags`
                );
                if (countryResponse.ok) {
                  const countryData = await countryResponse.json();
                  if (countryData && countryData.length > 0) {
                    const apiCountry = countryData[0];
                    let dialCode = "";
                    if (
                      apiCountry.idd?.root &&
                      apiCountry.idd?.suffixes?.length > 0
                    ) {
                      dialCode = `${apiCountry.idd.root}${apiCountry.idd.suffixes[0]}`;
                    } else if (apiCountry.idd?.root) {
                      dialCode = apiCountry.idd.root;
                    }

                    const fetchedCountry: Country = {
                      name: apiCountry.name.common,
                      code: apiCountry.cca2,
                      dialCode:
                        dialCode ||
                        countryCodes.find(
                          (c) => c.country === detectedCountryCode
                        )?.code ||
                        "+1",
                      flag: getCountryFlag(apiCountry.cca2),
                      flagImage: getCountryFlagImage(apiCountry.cca2),
                    };
                    console.log(
                      "✅ Fetched country from REST Countries API:",
                      fetchedCountry
                    );
                    setSelectedCountry(fetchedCountry);
                    setSelectedDialCode(fetchedCountry.dialCode);
                    setCountryCode(fetchedCountry.dialCode);
                  }
                }
              } catch (fetchError) {
                console.error(
                  "❌ Error fetching country from REST Countries API:",
                  fetchError
                );
              }
            }
          }
        } else {
          console.warn(
            "⚠️ No country code detected or countries list is empty"
          );
        }
      } catch (error) {
        console.error("❌ Error fetching IP/country:", error);
        // Use fallback (France) if IP detection fails
        console.log("🔄 Using fallback country (France)...");
        const fallbackCountry =
          countries.find((c) => c.code.toUpperCase() === "FR") ||
          FALLBACK_COUNTRIES.find((c) => c.code === "FR");
        if (fallbackCountry) {
          console.log("✅ Fallback country set:", {
            name: fallbackCountry.name,
            code: fallbackCountry.code,
            dialCode: fallbackCountry.dialCode,
          });
          setSelectedCountry(fallbackCountry);
          setSelectedDialCode(fallbackCountry.dialCode);
          setCountryCode(fallbackCountry.dialCode);
          setPays_user("FR");
        } else if (countries.length > 0) {
          // If France not found, use first country as fallback
          console.log("⚠️ France not found, using first country as fallback");
          const firstCountry = countries[0];
          setSelectedCountry(firstCountry);
          setSelectedDialCode(firstCountry.dialCode);
          setCountryCode(firstCountry.dialCode);
        }
      }

      // Log final state after a short delay to allow state updates
      setTimeout(() => {
        console.log("🎯 Final State Summary:", {
          totalCountries: countries.length,
          countriesInDropdown: countriesList.length,
          ipDetected: ip_user || "Not detected",
          countryCode: pays_user || "Not detected",
        });
      }, 100);
    };
    initialize();
  }, []);

  // Log countries list when it's updated
  useEffect(() => {
    if (countriesList.length > 0) {
      console.log("📋 Countries list updated:", {
        total: countriesList.length,
        sample: countriesList.slice(0, 10).map((c) => `${c.name} (${c.code})`),
      });
    }
  }, [countriesList]);

  // Input Handling Logic
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Special handling for phone input - only allow numbers
    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
    if (name === "phone") {
      setPhoneError("");
    }
  };

  // Validation Functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phone);
  };

  // Complete Form Validation
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
    };
    let isValid = true;

    // Validate firstName
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    // Validate lastName
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Invalid phone number";
      isValid = false;
    }

    // Validate country
    if (!selectedCountry) {
      newErrors.country = "Country is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Form Submission Handler (Main Logic)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setPhoneError("");

    // Step 1: Validate phone length (9-10 digits)
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!/^\d{9,10}$/.test(phoneDigits)) {
      setPhoneError("Phone number must be 9-10 digits");
      setIsSubmitting(false);
      return;
    }

    // Step 2: Validate all form fields
    if (!validateForm()) {
      if (!formData.firstName.trim()) {
        setSubmitError("First name is required");
      } else if (!formData.lastName.trim()) {
        setSubmitError("Last name is required");
      } else if (!formData.email.trim() || !validateEmail(formData.email)) {
        setSubmitError("Invalid email address");
      } else if (!selectedCountry) {
        setPhoneError("Country is required");
      }
      setIsSubmitting(false);
      return;
    }

    try {
      // Step 3: Prepare Google Sheets payload
      const sheet_payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        sid: SID,
        user_ip: ip_user,
        country: pays_user,
        c_id: C_ID,
        phone: selectedCountry?.dialCode
          ? `${selectedCountry.dialCode}${phoneDigits}`
          : phoneDigits,
        source: SOURCE,
        lp: LP,
      };

      // Step 4: Prepare CRM API payload
      const payload = {
        f: formData.firstName,
        l: formData.lastName,
        su: "https://tradvision.app/",
        m: formData.email,
        tu: "thank-you",
        ip: ip_user,
        p: pays_user,
        gid: -1,
        cid: CID,
        t: selectedCountry?.dialCode
          ? `${selectedCountry.dialCode}${phoneDigits}`
          : phoneDigits,
        so: SOURCE,
      };

      // Step 5: Submit all requests in parallel (fire and forget for faster response)
      const queryString = new URLSearchParams(payload as any).toString();

      // Fire all requests in parallel without waiting
      Promise.allSettled([
        // CRM API call
        fetch(`${CRM_API_URL}?${queryString}`, {
          method: "GET",
          headers: {},
        }).catch((err) => console.error("CRM API error:", err)),

        // Google Sheets Primary (no-cors, can't wait for response anyway)
        fetch(SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify(sheet_payload),
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors",
        }).catch((err) => console.error("Google Sheets Primary error:", err)),

        // Google Sheets Duplicate (no-cors, can't wait for response anyway)
        fetch(DUPLICATE_SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify(sheet_payload),
          headers: {
            "Content-Type": "text/plain",
          },
          mode: "no-cors",
        }).catch((err) => console.error("Google Sheets Duplicate error:", err)),
      ]);

      // Step 6: Handle success immediately (don't wait for API responses)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
      setSelectedCountry(null);

      // Navigate to our thank you page immediately
      navigate("/thank-you");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        "There was an error submitting the form. Please try again later."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-12 border-t-4 border-primary bg-background p-6 md:p-10 rounded-sm shadow-sm">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-foreground mb-3">
          Check Your Eligibility to Join the Program
        </h2>
        <p className="text-muted-foreground mb-8">
          Register below to be contacted by an official program consultant.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-foreground font-medium">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={`h-12 ${errors.firstName ? "border-destructive" : ""}`}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive">{errors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-foreground font-medium">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className={`h-12 ${errors.lastName ? "border-destructive" : ""}`}
            />
            {errors.lastName && (
              <p className="text-sm text-destructive">{errors.lastName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              className={`h-12 ${errors.email ? "border-destructive" : ""}`}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground font-medium">
              Phone Number
            </Label>
            <div className="flex gap-2">
              <Select
                value={selectedDialCode}
                onValueChange={(value) => {
                  setSelectedDialCode(value);
                  // Find country object from countriesList by dial code
                  const countryObj = countriesList.find(
                    (c) => c.dialCode === value
                  );
                  if (countryObj) {
                    setSelectedCountry(countryObj);
                    setCountryCode(value);
                    // Update pays_user to match user selection (uppercase)
                    setPays_user(countryObj.code.toUpperCase());
                  } else {
                    // Fallback: try to find in countryCodes mapping
                    const fallbackCountry = countryCodes.find(
                      (c) => c.code === value
                    );
                    if (fallbackCountry) {
                      const fallback: Country = {
                        name: fallbackCountry.country,
                        code: fallbackCountry.country.toUpperCase(),
                        dialCode: fallbackCountry.code,
                        flag: getCountryFlag(fallbackCountry.country),
                        flagImage: getCountryFlagImage(fallbackCountry.country),
                      };
                      setSelectedCountry(fallback);
                      setCountryCode(value);
                      setPays_user(fallbackCountry.country.toUpperCase());
                    }
                  }
                }}
              >
                <SelectTrigger className="w-32 h-12">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="max-h-[400px]">
                  {countriesList
                    .filter((c) => c.code && c.name) // Show all countries with valid code and name
                    .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
                    .map((country) => (
                      <SelectItem
                        key={`${country.code}-${country.dialCode}`}
                        value={country.dialCode}
                      >
                        <span className="flex items-center gap-2">
                          {country.flagImage ? (
                            <img
                              src={country.flagImage}
                              alt={country.name}
                              className="w-5 h-4 object-cover rounded-sm"
                              onError={(e) => {
                                // Fallback to emoji if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                if (target.nextSibling) {
                                  (
                                    target.nextSibling as HTMLElement
                                  ).style.display = "inline";
                                }
                              }}
                            />
                          ) : (
                            <span className="text-lg">{country.flag}</span>
                          )}
                          <span className="font-medium">
                            {country.dialCode}
                          </span>
                        </span>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number (9-10 digits)"
                value={formData.phone}
                onChange={handleChange}
                onKeyPress={(e) => {
                  // Prevent non-numeric input
                  if (!/[0-9]/.test(e.key) || formData.phone.length >= 10) {
                    e.preventDefault();
                  }
                }}
                required
                className={`flex-1 h-12 ${
                  errors.phone || phoneError ? "border-destructive" : ""
                }`}
              />
            </div>
            {(errors.phone || phoneError) && (
              <p className="text-sm text-destructive">
                {errors.phone || phoneError}
              </p>
            )}
            {errors.country && (
              <p className="text-sm text-destructive">{errors.country}</p>
            )}
          </div>

          {submitError && (
            <div className="text-sm text-destructive">{submitError}</div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full h-14 text-lg font-semibold mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Get Started"}
          </Button>
        </form>
      </div>
    </section>
  );
}
