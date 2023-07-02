import { mount } from "@vue/test-utils";
import TheButton from "@/components/TheButton.vue";

describe("TheButton", () => {
  it("renders button with default props", () => {
    const wrapper = mount(TheButton);
    const button = wrapper.find("button");

    expect(button.exists()).toBe(true);
    expect(button.classes()).toContain("the-button");
    expect(button.classes()).not.toContain("the-button__rounded");
    expect(button.attributes("style")).toBe("background-color: green;");
    expect(button.text()).toBe("");
  });

  it("renders button with custom props", async () => {
    const wrapper = mount(TheButton, {
      propsData: {
        rounded: true,
        color: "blue",
      },
      slots: {
        default: "Click me",
      },
    });
    const button = wrapper.find("button");

    expect(button.exists()).toBe(true);
    expect(button.classes()).toContain("the-button");
    expect(button.classes()).toContain("the-button__rounded");
    expect(button.attributes("style")).toBe("background-color: blue;");
    expect(button.text()).toBe("Click me");
  });

  it("emits click event when clicked", async () => {
    const wrapper = mount(TheButton);
    const button = wrapper.find("button");

    button.trigger("click");

    expect(wrapper.emitted("click")).toBeTruthy();
    expect(wrapper.emitted("click").length).toBe(1);
  });
});
