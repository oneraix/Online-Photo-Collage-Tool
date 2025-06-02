from PIL import Image, ImageOps

def resize_images(images, mode='horizontal'):
    if mode == 'horizontal':
        height = min(img.height for img in images)
        return [img.resize((int(img.width * height / img.height), height)) for img in images]
    else:
        width = min(img.width for img in images)
        return [img.resize((width, int(img.height * width / img.width))) for img in images]

def add_border(img, border_size, color):
    return ImageOps.expand(img, border=border_size, fill=color)

def merge_images(images, mode='horizontal'):
    if mode == 'horizontal':
        total_width = sum(img.width for img in images)
        max_height = max(img.height for img in images)
        new_img = Image.new('RGB', (total_width, max_height), (255, 255, 255))
        x_offset = 0
        for img in images:
            new_img.paste(img, (x_offset, 0))
            x_offset += img.width
    else:
        total_height = sum(img.height for img in images)
        max_width = max(img.width for img in images)
        new_img = Image.new('RGB', (max_width, total_height), (255, 255, 255))
        y_offset = 0
        for img in images:
            new_img.paste(img, (0, y_offset))
            y_offset += img.height
    return new_img
