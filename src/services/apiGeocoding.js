// export async function getAddress({ latitude, longitude }) {
//   const res = await fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
//   );
//   if (!res.ok) throw Error("Failed getting address");

//   const data = await res.json();
//   return data;
// }
    
/**
 * دریافت آدرس از مختصات جغرافیایی با استفاده از OpenStreetMap
 * جایگزین شده با API جدید به دلیل عدم دسترسی به BigDataCloud
 */
/////////////////////
// export async function getAddress({ latitude, longitude }) {
//   try {
//     // استفاده از Nominatim (OpenStreetMap)
//     // اضافه کردن پارامتر format=jsonv2 برای دریافت ساختار استاندارد
//     const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

//     const res = await fetch(url, {
//       method: 'GET',
//       headers: {
//         // این هدر برای جلوگیری از ارور 403 یا بلاک شدن توسط OpenStreetMap حیاتی است
//         'User-Agent': 'PizzaOrderingApp/1.0' 
//       }
//     });

//     if (!res.ok) {
//       throw new Error(`Failed getting address: ${res.status}`);
//     }

//     const data = await res.json();

//     // برای اینکه ساختار خروجی برای بقیه پروژه‌ات (Redux و غیره) تغییر نکند،
//     // اگر کد قبلی‌ات مستقیماً از خودِ data استفاده می‌کرد، همین را برگردان.
//     // اما اگر نیاز داشتی خروجی تمیزتری داشته باشی، می‌توانیم اینجا تغییرش دهیم.
    
// console.log("DEBUG: API Response Data:", data); // <--- این
//     return data; 

//   } catch (error) {
//     // مدیریت خطا برای اینکه اپلیکیشن کرش نکند
//     console.error("Geocoding Error:", error.message);
//     throw new Error("خطا در دریافت آدرس. لطفاً اتصال اینترنت خود را بررسی کنید.");
//   }
// }
export async function getAddress({ latitude, longitude }) { // ورودی‌ها همان اسامی کامل تو هستند
  try {
    // ۱. تبدیل اسامی کامل تو به اسامی کوتاه که API می‌فهمد (Mapping Input)
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
    
    const res = await fetch(url, {
      headers: { 'User-Agent': 'PizzaApp/1.0' }
    });

    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();

    // ۲. تبدیل خروجی API به ساختار دلخواه خودت (Mapping Output)
    // اینجا هر چیزی که API برمی‌گرداند را به اسامی مورد نظر تو تبدیل می‌کنیم
    return {
      // فرض می‌کنیم در کل پروژه از این اسامی استفاده می‌کنی:
      latitude: latitude, 
      longitude: longitude,
      city: data.address.city || data.address.town || "",
      street: data.address.road || "",
      postcode: data.address.postcode || "",
      // اگر فیلد دیگری در پروژه داری، اینجا اضافه کن
    };

  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
