import { css, html, Wrec } from "wrec";

export type Address = {
  city: string;
  state: string;
  street: string;
  zip: string;
};

export type Person = {
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  address: Address;
};

export class ContactPerson extends Wrec {
  static properties = {
    person: {
      type: Object,
      usedBy: ["get city", "get state", "get street", "get zip", "getFullName"],
    },
  };

  declare person: Person;

  static css = css``;

  static html = html`
    <div class="row">this.getFullName()</div>
    <div class="row">this.street</div>
    <div class="row">
      <span>this.city</span>,
      <span>this.state</span>
      <span>this.zip</span>
    </div>
  `;

  get city() {
    return this.person?.address?.city ?? "no city";
  }

  get state() {
    return this.person?.address?.state ?? "no state";
  }

  get street() {
    return this.person?.address?.street ?? "no street";
  }

  get zip() {
    return this.person?.address?.zip ?? "no zip";
  }

  getFullName() {
    const { firstName, middleName, lastName } = this.person;
    return lastName ? `${firstName} ${middleName} ${lastName}` : `no person`;
  }
}

ContactPerson.define("contact-person");
