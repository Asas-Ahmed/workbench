.PHONY: dev build build-linux build-windows frontend test fmt init-android gen-assets build-android

dev:
	wails dev -tags webkit2_41

build:
	wails build

build-linux:
	wails build -platform linux/amd64 -tags webkit2_41 -clean -ldflags "-s -w"

build-windows:
	wails build -platform windows/amd64 -clean -ldflags "-s -w"

frontend:
	cd frontend && npm install

test:
	go test ./...

fmt:
	gofmt -w .

# --- Android Setup & Asset Generation (Run Once or When Updating Icons) ---

init-android:
	cd frontend && \
	npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/assets --save-dev && \
	npx cap init && \
	npx cap add android

gen-assets:
	cd frontend && \
	npx capacitor-assets generate --android

# --- Android Everyday Build ---

build-android:
	cd frontend && \
	npm run build && \
	npx cap sync android && \
	cd android && \
	./gradlew clean assembleDebug

# --- Debug ---

zip:
	git ls-files -co --exclude-standard | zip app.zip -@

zip-ask:
	@read -p "Enter folder path to zip: " folder; \
	git ls-files -co --exclude-standard "$$folder" | zip app.zip -@
