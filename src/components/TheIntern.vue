<template>
  <div class="the-intern">
    <div class="the-intern__inputs-wrapper">
      <div class="the-intern__inputs">
        <label class="the-intern__label">
          <span class="the-intern__text">First Name</span>
          <input class="the-intern__input" type="text" v-model="firstName" />
          <span v-if="firstNameError" class="the-intern__error">{{ firstNameError }}</span>
        </label>
        <label class="the-intern__label">
          <span class="the-intern__text">Last Name</span>
          <input class="the-intern__input" type="text" v-model="lastName" />
          <span v-if="lastNameError" class="the-intern__error">{{ lastNameError }}</span>
        </label>
      </div>

      <TheButton @click="handleClick">
        Update Details
      </TheButton>
    </div>

    <div class="the-intern__photo">
      <img :src="imageSrc || require('../assets/img/default-user.png')" width="100" height="100" alt="user">
      <label class="the-intern__button">
        <input type="file" accept="image/*" @input="handleImage" />
        <TheCamera />
        Change Photo
      </label>
    </div>
  </div>
</template>

<script>
import TheButton from "@/components/TheButton.vue";
import TheCamera from "@/components/icons/TheCamera.vue";
export default {
  name: "TheIntern",
  components: {
    TheButton,
    TheCamera,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      firstNameError: "",
      lastNameError: "",
      imageSrc: null,
    };
  },
  methods: {
    validateFirstName() {
      if (!this.firstName) {
        this.firstNameError = "First Name is required";
      } else if (!/^[a-zA-Z]+$/.test(this.firstName)) {
        this.firstNameError = "First Name should only contain letters";
      } else {
        this.firstNameError = "";
      }
    },
    validateLastName() {
      if (!this.lastName) {
        this.lastNameError = "Last Name is required";
      } else if (!/^[a-zA-Z]+$/.test(this.lastName)) {
        this.lastNameError = "Last Name should only contain letters";
      } else {
        this.lastNameError = "";
      }
    },
    handleImage(event)  {
      if (!event.target?.files) {
        return;
      }

      const file = event.target?.files[0];

      if (file && file.type.startsWith('image/')) {
        this.loadImage(file);
      }
    },
    loadImage(file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.imageSrc = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    validation() {
      this.validateFirstName();
      this.validateLastName();
    },
    async handleClick() {
      this.validation()

      if (this.firstNameError || this.lastNameError) {
        return; // Don't proceed if there are validation errors
      }

      this.$emit("close", {
        first_name: this.firstName,
        last_name: this.lastName,
        local_image: this.imageSrc,
      });
    },
  },
}
</script>

<style scoped lang="scss">
.the-intern {
  display: flex;
  justify-content: space-between;
  height: 300px;
  padding-top: 50px;

  &__inputs-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__inputs {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
  }

  &__label {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__text {
    font-weight: 700;
  }

  &__input {
    width: 400px;
    height: 25px;
  }

  &__error {
    color: red;
  }

  &__submit {
    width: 150px;
    height: 50px;
    padding: 5px 10px;
    background: green;
  }

  &__photo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 400px;
    padding: 20px;
  }

  &__button {
    width: 100%;
    height: 35px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid grey;
    border-radius: 5px;
    color: #3a3a3a;
    gap: 10px;

    svg {
      width: 15px;
    }

    input {
      display: none;
    }
  }
}
</style>
