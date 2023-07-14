<template>
  <div class="profile-card">
    <vee-form @submit="save">
      <p class="text-center avatar-edit">
        <label style="cursor: pointer">
          <app-avatar-img
            :src="activeUser.avatar"
            :alt="`${user.name} profile picture`"
            class="avatar-xlarge img-update"
          />
          <div class="avatar-upload-overlay">
            <app-spinner v-if="uploadingImage" color="white" />
            <fa
              v-else
              icon="camera"
              size="3x"
              style="color: white; opacity: 8"
            />
          </div>
          <input
            v-show="false"
            type="file"
            id="avatar"
            accept="image/*"
            @change="handleAvatarUpload"
          />
        </label>
      </p>

      <user-profile-card-editor-random-avatar @hit="randomAvatar" />

      <app-form-field
        label="Username"
        name="username"
        v-model="activeUser.username"
        :rules="`required|unique:users,username,${user.username}`"
      />

      <app-form-field
        label="Full Name"
        name="name"
        v-model="activeUser.name"
        rules="required"
      />

      <app-form-field
        as="textarea"
        label="Bio"
        name="bio"
        v-model="activeUser.bio"
        placeholder="Write a few words about yourself."
      />

      <div class="stats">
        <span>{{ user.postsCount }} posts</span>
        <span>{{ user.threadsCount }} threads</span>
      </div>

      <hr />

      <app-form-field
        label="Website"
        name="website"
        v-model="activeUser.website"
        rules="url"
      />

      <app-form-field
        label="Email"
        name="email"
        v-model="activeUser.email"
        :rules="`required|email|unique:users,email,${user.email}`"
      />

      <app-form-field
        label="Location"
        name="location"
        v-model="activeUser.location"
        list="locations"
        @mouseenter="loadLocationOptions"
      />

      <datalist id="locations">
        <option
          v-for="location in locationOptions"
          :value="location.name.common"
          :key="location.name.common"
        />
      </datalist>

      <div class="btn-group space-between">
        <button class="btn-ghost" type="button" @click.prevent="cancel">
          Cancel
        </button>
        <button type="submit" class="btn-blue">Save</button>
      </div>
    </vee-form>
    <user-profile-card-editor-reauthenticate
      v-model="needsReAuth"
      @success="onReauthenticated"
      @fail="onReauthenticatedFailed"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import UserProfileCardEditorRandomAvatar from "@/components/UserProfileCardEditorRandomAvatar";
import UserProfileCardEditorReauthenticate from "@/components/UserProfileCardEditorReauthenticate";
import useNotifications from "@/composables/useNotifications";

export default {
  components: {
    UserProfileCardEditorRandomAvatar,
    UserProfileCardEditorReauthenticate,
  },
  data() {
    return {
      uploadingImage: false,
      activeUser: { ...this.user },
      locationOptions: [],
      needsReAuth: false,
    };
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const { addNotification } = useNotifications();
    return { addNotification };
  },

  methods: {
    ...mapActions("auth", ["uploadAvatar"]),

    async loadLocationOptions() {
      if (this.locationOptions.length) return;
      const res = await fetch("https://restcountries.com/v3.1/all");
      this.locationOptions = await res.json();
    },

    async handleAvatarUpload(event) {
      this.uploadingImage = true;
      const [file] = event.target.files;
      const uploadedImage = await this.uploadAvatar({ file });
      this.activeUser.avatar = uploadedImage || this.activeUser.avatar;
      this.uploadingImage = false;
    },

    async onReauthenticated() {
      await this.$store.dispatch("auth/updateEmail", {
        email: this.activeUser.email,
      });
      this.saveUserData();
    },

    async onReauthenticatedFailed() {
      this.addNotification({
        message: "Error updating user",
        type: "error",
        timeout: 3000,
      });
      this.$router.push({ name: "Profile" });
    },

    async saveUserData() {
      await this.$store.dispatch("users/updateUser", {
        ...this.activeUser,
        threads: this.activeUser.threadIds,
      });
      this.$router.push({ name: "Profile" });
      this.addNotification({
        message: "User successfully updated",
        timeout: 3000,
      });
    },

    async save() {
      await this.handleRandomAvatarUpload();
      const isEmailChanged = this.activeUser.email !== this.user.email;

      if (isEmailChanged) {
        this.needsReAuth = true;
      } else {
        this.saveUserData();
      }
    },

    cancel() {
      this.$router.push({ name: "Profile" });
    },

    async handleRandomAvatarUpload() {
      const isRandomAvatarGenerated = this.activeUser.avatar.startsWith(
        "https://images.unsplash.com"
      );
      if (isRandomAvatarGenerated) {
        const image = await fetch(this.activeUser.avatar);
        const blob = await image.blob();
        this.activeUser.avatar = await this.uploadAvatar({
          file: blob,
          filename: "random",
        });
      }
    },

    randomAvatar(url) {
      this.activeUser.avatar = url;
    },
  },
};
</script>

<style></style>
