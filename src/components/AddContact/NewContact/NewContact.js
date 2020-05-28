export default class NewContact {
  constructor(name, email, tel) {
    this.name = name;
    this.email = email;
    this.tel = tel;
    Object.defineProperty(this, "hash", {
      writable: true,
      enumerable: false,
      configurable: true,
    });
    const str = name + tel + email;
    this.hash = ((str) =>
      str.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0))(str);
  }
}
